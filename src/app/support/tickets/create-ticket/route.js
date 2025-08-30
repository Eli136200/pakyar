export async function POST(req) {
    try {
      const body = await req.json();
      const title = String(body?.title || "").trim();
      const message = String(body?.message || "").trim();
  
      if (!title || !message) {
        return new Response(
          JSON.stringify({ message: "عنوان و متن پیام الزامی است." }),
          { status: 400 }
        );
      }
  
      // TODO: اتصال واقعی به دیتابیس (Prisma)
      // مثال:
      // const ticket = await prisma.ticket.create({
      //   data: { title, message, userId }
      // });
  
      return new Response(
        JSON.stringify({ message: "ثبت شد", ticket: { id: "demo-id", title, message } }),
        { status: 201 }
      );
    } catch (err) {
      return new Response(JSON.stringify({ message: "خطای غیرمنتظره" }), { status: 500 });
    }
  }
  