import { registerAs } from "@nestjs/config";

// all your application settings go here.
export default registerAs("settings", () => ({
  users: {
    status: {
      active: 1,
      inActive: 2,
    },
    gender: {
      male: 1,
      female: 2,
      other: 3,
    },
    document: {
      status: {
        open: 1,
        inProgress: 2,
        completed: 3,
      },
    },
  },
}));
