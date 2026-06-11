
'use server';
/**
 * @fileOverview An AI agent that helps users plan their day.
 *
 * - planDay - A function that generates a daily schedule.
 * - DayPlannerInput - The input type for the planDay function.
 * - DayPlannerOutput - The return type for the planDay function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const DayPlannerInputSchema = z.object({
  mainGoals: z.string().describe('The main goals the user wants to achieve today.'),
  fixedAppointments: z.string().describe('Any fixed appointments or meetings, with their times (e.g., "Dentist at 2pm").'),
});
export type DayPlannerInput = z.infer<typeof DayPlannerInputSchema>;

const ScheduleItemSchema = z.object({
    time: z.string().describe('The time for the schedule item (e.g., "9:00 AM - 10:00 AM").'),
    task: z.string().describe('The task or activity for this time slot.'),
    category: z.enum(['Work', 'Personal', 'Break', 'Appointment', 'Learning']).describe('The category of the task.'),
});

const DayPlannerOutputSchema = z.object({
    schedule: z.array(ScheduleItemSchema).describe('A list of tasks and time slots for the day.'),
    motivationalQuote: z.string().describe('An inspiring quote for the day.'),
});
export type DayPlannerOutput = z.infer<typeof DayPlannerOutputSchema>;

export async function planDay(input: DayPlannerInput): Promise<DayPlannerOutput> {
  return dayPlannerFlow(input);
}

const prompt = ai.definePrompt({
    name: 'dayPlannerPrompt',
    input: { schema: DayPlannerInputSchema },
    output: { schema: DayPlannerOutputSchema },
    prompt: `You are an expert productivity coach. Your task is to create a realistic and motivating daily schedule for a user based on their goals and fixed appointments.

The current time is {{moment 'h:mm A'}}.

User's Main Goals:
"{{{mainGoals}}}"

Fixed Appointments:
"{{{fixedAppointments}}}"

Instructions:
1.  Analyze the user's goals and appointments.
2.  Create a structured schedule as an array of tasks. Start from the current time and plan for the rest of the day.
3.  Include breaks and meals.
4.  Group related tasks into logical blocks.
5.  Ensure the schedule is realistic and not overly packed.
6.  Provide a short, powerful motivational quote to inspire the user for the day.

Return the full schedule and the quote in the specified JSON format.
`,
});


const dayPlannerFlow = ai.defineFlow(
  {
    name: 'dayPlannerFlow',
    inputSchema: DayPlannerInputSchema,
    outputSchema: DayPlannerOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
