import { z } from "zod";

const UUIDSchema = z.string().uuid();

type UUID = z.infer<typeof UUIDSchema>;

export { type UUID, UUIDSchema };
