// app/api/tests/test-endpoints.js
const prisma = require('../../lib/prisma/schema.prisma');
// Base URL for your API (adjust if running on a different port)
const BASE_URL = 'http://localhost:3000';

// Test data
const testPlayerAddress = '0x1234567890abcdef1234567890abcdef12345678';
const testReferredByAddress = '0xabcdef1234567890abcdef1234567890abcdef12';
let testTaskId;

// Helper function to log results
function logResult(testName, response, data) {
  console.log(`\nTest: ${testName}`);
  console.log(`Status: ${response.status}`);
  console.log('Response:', data);
  if (response.status >= 200 && response.status < 300) {
    console.log('✅ Test Passed');
  } else {
    console.log('❌ Test Failed');
  }
}

// Main test function
async function runTests() {
  try {
    // Clean up test data before starting
    console.log('Cleaning up test data...');
    await prisma.player.deleteMany({ where: { address: testPlayerAddress } });
    await prisma.task.deleteMany({ where: { id: { gte: 1 } } });

    // 1. Test Players Endpoints
    console.log('\n=== Testing Players Endpoints ===\n');

    // GET /app/api/players (Fetch all players)
    let response = await fetch(`${BASE_URL}/app/api/players`);
    let data = await response.json();
    logResult('GET /app/api/players', response, data);

    // POST /app/api/players (Create a new player)
    response = await fetch(`${BASE_URL}/app/api/players`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: testPlayerAddress, referredBy: null }),
    });
    data = await response.json();
    logResult('POST /app/api/players', response, data);

    // GET /app/api/players/[player] (Fetch specific player)
    response = await fetch(`${BASE_URL}/app/api/players/${testPlayerAddress}`);
    data = await response.json();
    logResult(`GET /app/api/players/${testPlayerAddress}`, response, data);

    // PUT /app/api/players/[player] (Update player points)
    response = await fetch(`${BASE_URL}/app/api/players/${testPlayerAddress}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ points: 100 }),
    });
    data = await response.json();
    logResult(`PUT /app/api/players/${testPlayerAddress}`, response, data);

    // DELETE /app/api/players/[player] (Delete player)
    response = await fetch(`${BASE_URL}/app/api/players/${testPlayerAddress}`, {
      method: 'DELETE',
    });
    data = await response.json();
    logResult(`DELETE /app/api/players/${testPlayerAddress}`, response, data);

    // Verify deletion
    response = await fetch(`${BASE_URL}/app/api/players/${testPlayerAddress}`);
    data = await response.json();
    logResult(`Verify DELETE /app/api/players/${testPlayerAddress}`, response, data);

    // 2. Test Tasks Endpoints
    console.log('\n=== Testing Tasks Endpoints ===\n');

    // Recreate a player for tasks
    await fetch(`${BASE_URL}/app/api/players`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: testPlayerAddress, referredBy: null }),
    });

    // GET /app/api/tasks (Fetch all tasks)
    response = await fetch(`${BASE_URL}/app/api/tasks`);
    data = await response.json();
    logResult('GET /app/api/tasks', response, data);

    // POST /app/api/tasks (Create a new task)
    response = await fetch(`${BASE_URL}/app/api/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        playerAddress: testPlayerAddress,
        title: 'Test Task',
        description: 'A test task',
        type: 'DAILY',
        points: 10,
      }),
    });
    data = await response.json();
    testTaskId = data.id;
    logResult('POST /app/api/tasks', response, data);

    // GET /app/api/tasks/[task] (Fetch specific task)
    response = await fetch(`${BASE_URL}/app/api/tasks/${testTaskId}`);
    data = await response.json();
    logResult(`GET /app/api/tasks/${testTaskId}`, response, data);

    // PUT /app/api/tasks/[task] (Update task - mark as completed)
    response = await fetch(`${BASE_URL}/app/api/tasks/${testTaskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: true }),
    });
    data = await response.json();
    logResult(`PUT /app/api/tasks/${testTaskId}`, response, data);

    // DELETE /app/api/tasks/[task] (Delete task)
    response = await fetch(`${BASE_URL}/app/api/tasks/${testTaskId}`, {
      method: 'DELETE',
    });
    data = await response.json();
    logResult(`DELETE /app/api/tasks/${testTaskId}`, response, data);

    // Verify deletion
    response = await fetch(`${BASE_URL}/app/api/tasks/${testTaskId}`);
    data = await response.json();
    logResult(`Verify DELETE /app/api/tasks/${testTaskId}`, response, data);

  } catch (error) {
    console.error('Test suite failed:', error);
  } finally {
    // Clean up
    await prisma.player.deleteMany({ where: { address: testPlayerAddress } });
    await prisma.task.deleteMany({ where: { id: testTaskId } });
  }
}

// Run the tests
runTests().catch(console.error);