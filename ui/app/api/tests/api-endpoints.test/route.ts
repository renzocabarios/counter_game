import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
// Base URL for your API (adjust if running on a different port)
const BASE_URL = "http://localhost:3000";

// Test data
const testPlayerAddress = "0x1234567890abcdef1234567890abcdef12345678";
const testReferredByAddress = "0xabcdef1234567890abcdef1234567890abcdef12";
let testTaskId: number | undefined;

// Helper function to log results and build response text
async function logResult(testName: string, response: Response, data: any, results: string[]): Promise<void> {
  const contentType = response.headers.get("Content-Type") || "";
  let responseText = "No response body";

  if (data !== undefined) {
    responseText = JSON.stringify(data);
  } else if (contentType.includes("application/json")) {
    responseText = JSON.stringify(await response.json());
  } else {
    responseText = await response.text();
    responseText = responseText.length > 100 ? responseText.substring(0, 100) + "..." : responseText;
  }

  const status = response.status;
  const passFail = status >= 200 && status < 300 ? "✅ Test Passed" : "❌ Test Failed";
  results.push(`Test: ${testName}`);
  results.push(`Status: ${status}`);
  results.push(`Content-Type: ${contentType}`);
  results.push(`Response: ${responseText}`);
  results.push(`${passFail}`);
  results.push(""); // Empty line for readability
}

// Main test function
async function runTests(): Promise<string[]> {
  const results: string[] = [];
  let playerCreated = false;

  try {
    // Start message
    results.push("=== Starting Test Suite ===");

    // Clean up test data before starting (delete tasks first, then player)
    results.push("Cleaning up test data...");
    if (prisma) {
      try {
        // Delete tasks first to avoid foreign key constraint
        await prisma.task.deleteMany({ where: { playerAddress: testPlayerAddress } });
        await prisma.player.deleteMany({ where: { address: testPlayerAddress } });
      } catch (cleanupError) {
        results.push(`Cleanup failed: ${cleanupError.message}`);
      }
    } else {
      results.push("Warning: Prisma is undefined, cleanup skipped.");
    }

    // 1. Test Players Endpoints
    results.push("=== Testing Players Endpoints ===");

    // GET /api/players (Fetch all players)
    let response = await fetch(`${BASE_URL}/api/players`);
    let data = await response.json();
    await logResult("GET /api/players", response, data, results);

    // POST /api/players (Create a new player)
    response = await fetch(`${BASE_URL}/api/players`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address: testPlayerAddress, referredBy: null }),
    });
    data = response.headers.get("Content-Type")?.includes("application/json") ? await response.json() : undefined;
    await logResult("POST /api/players", response, data, results);
    playerCreated = response.status === 201;

    if (playerCreated) {
      // GET /api/players/[player] (Fetch specific player)
      response = await fetch(`${BASE_URL}/api/players/${testPlayerAddress}`);
      data = response.headers.get("Content-Type")?.includes("application/json") ? await response.json() : undefined;
      await logResult(`GET /api/players/${testPlayerAddress}`, response, data, results);

      // PUT /api/players/[player] (Update player points)
      response = await fetch(`${BASE_URL}/api/players/${testPlayerAddress}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: testPlayerAddress, points: 100 }),
      });
      data = response.headers.get("Content-Type")?.includes("application/json") ? await response.json() : undefined;
      await logResult(`PUT /api/players/${testPlayerAddress}`, response, data, results);

      // 2. Test Tasks Endpoints
      results.push("=== Testing Tasks Endpoints ===");

      // GET /api/tasks (Fetch all tasks)
      response = await fetch(`${BASE_URL}/api/tasks`);
      data = response.headers.get("Content-Type")?.includes("application/json") ? await response.json() : undefined;
      await logResult("GET /api/tasks", response, data, results);

      // POST /api/tasks (Create a new task)
      response = await fetch(`${BASE_URL}/api/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playerAddress: testPlayerAddress,
          title: "Test Task",
          description: "A test task",
          type: "DAILY",
          points: 10,
        }),
      });
      data = response.headers.get("Content-Type")?.includes("application/json") ? await response.json() : undefined;
      testTaskId = data?.id;
      await logResult("POST /api/tasks", response, data, results);

      if (testTaskId) {
        // GET /api/tasks/[task] (Fetch specific task)
        response = await fetch(`${BASE_URL}/api/tasks/${testTaskId}`);
        data = response.headers.get("Content-Type")?.includes("application/json") ? await response.json() : undefined;
        await logResult(`GET /api/tasks/${testTaskId}`, response, data, results);

        // PUT /api/tasks/[task] (Update task - mark as completed)
        response = await fetch(`${BASE_URL}/api/tasks/${testTaskId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ completed: true }),
        });
        data = response.headers.get("Content-Type")?.includes("application/json") ? await response.json() : undefined;
        await logResult(`PUT /api/tasks/${testTaskId}`, response, data, results);

        // DELETE /api/tasks/[task] (Delete task)
        response = await fetch(`${BASE_URL}/api/tasks/${testTaskId}`, {
          method: "DELETE",
        });
        data = response.headers.get("Content-Type")?.includes("application/json") ? await response.json() : undefined;
        await logResult(`DELETE /api/tasks/${testTaskId}`, response, data, results);

        // Verify task deletion
        response = await fetch(`${BASE_URL}/api/tasks/${testTaskId}`);
        data = response.headers.get("Content-Type")?.includes("application/json") ? await response.json() : undefined;
        await logResult(`Verify DELETE /api/tasks/${testTaskId}`, response, data, results);
      } else {
        results.push("Skipping task-specific tests: Failed to retrieve testTaskId from POST /api/tasks");
      }

      // DELETE /api/players/[player] (Delete player at the end)
      response = await fetch(`${BASE_URL}/api/players/${testPlayerAddress}`, {
        method: "DELETE",
      });
      data = response.headers.get("Content-Type")?.includes("application/json") ? await response.json() : undefined;
      await logResult(`DELETE /api/players/${testPlayerAddress}`, response, data, results);

      // Verify player deletion
      response = await fetch(`${BASE_URL}/api/players/${testPlayerAddress}`);
      data = response.headers.get("Content-Type")?.includes("application/json") ? await response.json() : undefined;
      await logResult(`Verify DELETE /api/players/${testPlayerAddress}`, response, data, results);
    } else {
      results.push("Skipping player-specific tests: Failed to create player in POST /api/players");
    }

  } catch (error) {
    results.push(`Test suite failed: ${error.message}`);
  } finally {
    // Clean up
    try {
      if (prisma) {
        // Delete tasks first to avoid foreign key constraint
        await prisma.task.deleteMany({ where: { playerAddress: testPlayerAddress } });
        await prisma.player.deleteMany({ where: { address: testPlayerAddress } });
      } else {
        results.push("Warning: Prisma is undefined, cleanup skipped.");
      }
    } catch (cleanupError) {
      results.push(`Cleanup failed: ${cleanupError.message}`);
    }
  }

  return results;
}

// API route
export async function GET(req: NextRequest): Promise<NextResponse> {
  // No body is expected or required for GET
  const testResults = await runTests();
  const responseText = testResults.join("\n");
  return new NextResponse(responseText, {
    status: 200,
    headers: { "Content-Type": "text/plain" },
  });
}