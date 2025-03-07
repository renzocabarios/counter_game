import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { task: string } }) {
  try {
    const taskId = parseInt(params.task);

    if (isNaN(taskId)) {
      return NextResponse.json({ error: "Task ID must be a number" }, {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: { player: true },
    });

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return NextResponse.json(task, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch task" }, {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { task: string } }) {
  try {
    const taskId = parseInt(params.task);
    const { completed } = await req.json();

    if (isNaN(taskId)) {
      return NextResponse.json({ error: "Task ID must be a number" }, {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const task = await prisma.task.update({
      where: { id: taskId },
      data: {
        completed,
        completedAt: completed ? new Date() : null,
      },
      include: { player: true },
    });

    if (completed && !task.completedAt) { // Only award points if newly completed
      await prisma.player.update({
        where: { address: task.playerAddress },
        data: { points: { increment: task.points } },
      });
    }

    return NextResponse.json(task, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update task" }, {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { task: string } }) {
  try {
    const taskId = parseInt(params.task);

    if (isNaN(taskId)) {
      return NextResponse.json({ error: "Task ID must be a number" }, {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await prisma.task.delete({ where: { id: taskId } });

    return NextResponse.json({ message: "Task deleted" }, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete task" }, {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export const revalidate = 0;

// // api/task/route.ts
// import prisma from "@/lib/prisma";
// import { NextRequest, NextResponse } from "next/server";

// // export async function GET(req: NextRequest, {params: {task}: {task: string}}) {
// export async function GET(
//   req: NextRequest,
//   { params }: { params: { task: string } },
// ) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const id = parseInt(searchParams.get("id") || "0");

//     if (!id) {
//       return NextResponse.json(
//         { error: "Task ID is required" },
//         {
//           status: 400,
//           headers: { "Content-Type": "application/json" },
//         },
//       );
//     }

//     const task = await prisma.task.findUnique({
//       where: { id },
//       include: { player: true },
//     });

//     if (!task) {
//       return NextResponse.json(
//         { error: "Task not found" },
//         {
//           status: 404,
//           headers: { "Content-Type": "application/json" },
//         },
//       );
//     }

//     return NextResponse.json(task, {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to fetch task" },
//       {
//         status: 500,
//         headers: { "Content-Type": "application/json" },
//       },
//     );
//   }
// }

// export async function PUT(req: NextRequest) {
//   try {
//     const { id, completed } = await req.json();

//     if (!id) {
//       return NextResponse.json(
//         { error: "Task ID is required" },
//         {
//           status: 400,
//           headers: { "Content-Type": "application/json" },
//         },
//       );
//     }

//     const task = await prisma.task.update({
//       where: { id },
//       data: {
//         completed,
//         completedAt: completed ? new Date() : null,
//       },
//       include: { player: true },
//     });

//     if (completed && !task.completedAt) {
//       // Only award points if newly completed
//       await prisma.player.update({
//         where: { address: task.playerAddress },
//         data: { points: { increment: task.points } },
//       });
//     }

//     return NextResponse.json(task, {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to update task" },
//       {
//         status: 500,
//         headers: { "Content-Type": "application/json" },
//       },
//     );
//   }
// }

// export async function DELETE(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const id = parseInt(searchParams.get("id") || "0");

//     if (!id) {
//       return NextResponse.json(
//         { error: "Task ID is required" },
//         {
//           status: 400,
//           headers: { "Content-Type": "application/json" },
//         },
//       );
//     }

//     await prisma.task.delete({ where: { id } });

//     return NextResponse.json(
//       { message: "Task deleted" },
//       {
//         status: 200,
//         headers: { "Content-Type": "application/json" },
//       },
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to delete task" },
//       {
//         status: 500,
//         headers: { "Content-Type": "application/json" },
//       },
//     );
//   }
// }

// export const revalidate = 0;
