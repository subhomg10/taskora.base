'use server';

/**
 * @fileOverview Provides job post tag suggestions based on the job description using generative AI.
 *
 * - suggestJobTags - A function that suggests relevant tags for a job post.
 * - SuggestJobTagsInput - The input type for the suggestJobTags function, including the job description.
 * - SuggestJobTagsOutput - The return type for the suggestJobTags function, a list of tag suggestions.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestJobTagsInputSchema = z.object({
  jobDescription: z
    .string()
    .describe('The description of the job post for which tags are to be suggested.'),
});
export type SuggestJobTagsInput = z.infer<typeof SuggestJobTagsInputSchema>;

const SuggestJobTagsOutputSchema = z.array(z.string()).describe('A list of suggested tags for the job post.');
export type SuggestJobTagsOutput = z.infer<typeof SuggestJobTagsOutputSchema>;

export async function suggestJobTags(input: SuggestJobTagsInput): Promise<SuggestJobTagsOutput> {
  return suggestJobTagsFlow(input);
}

const suggestJobTagsPrompt = ai.definePrompt({
  name: 'suggestJobTagsPrompt',
  input: {schema: SuggestJobTagsInputSchema},
  output: {schema: SuggestJobTagsOutputSchema},
  prompt: `You are an expert in job post categorization. Based on the job description provided, suggest a list of relevant tags that can be used to categorize the job and improve its discoverability.  Return a simple JSON array of strings.

Job Description: {{{jobDescription}}}`,
});

const suggestJobTagsFlow = ai.defineFlow(
  {
    name: 'suggestJobTagsFlow',
    inputSchema: SuggestJobTagsInputSchema,
    outputSchema: SuggestJobTagsOutputSchema,
  },
  async input => {
    const {output} = await suggestJobTagsPrompt(input);
    return output!;
  }
);
