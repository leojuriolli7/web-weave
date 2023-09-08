import { z } from 'zod';

export const requiredString = z.string().trim().nonempty('Required');
