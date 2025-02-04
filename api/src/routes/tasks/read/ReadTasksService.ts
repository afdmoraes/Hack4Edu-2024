import prismaClient from "@/prisma";

export class ReadTasksService {
  async execute(id: number) {
    try {
      let result = await prismaClient.tasks.findFirst({
        where: {
          id,
        },
        select: {
          questions: {
            select: {
              id: true,
              title: true,
              alternative1: true,
              alternative2: true,
              alternative3: true,
              alternative4: true,
              correctAlternative: true,
            }
          }
        }
      });

      return { result };
    } catch (error) {
      console.log(error);
    }
  }
}
