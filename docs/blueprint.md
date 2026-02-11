# **App Name**: AdminPro

## Core Features:

- Firebase Authentication: Implement Firebase Authentication to secure the admin dashboard, ensuring only users with the admin role can access it. Unauthorized users are redirected to the login page.
- Platform Analytics Dashboard: Display real-time analytics with stats cards showing Total Jobs Posted, Total Workers Registered, Total Tasks Completed, and Total Applications. The cards will have a clean design with subtle shadows and rounded corners.
- Job Listings Panel: Display job listings in a card layout, including job title, cover image, and a short description. Clicking on a job card opens a modal with full job details, requirements, large cover image, number of applicants, and a list of applicants.
- Applicant Management: Within the Job Listings Panel, allow admins to view applicant details (name, skills, rating, profile photo) and perform actions such as selecting a worker or initiating a direct message via basic Firebase chat or email.
- Worker Verification: Enable admins to view a list of workers requesting verification, including their name, profile image, and ID proof image, with options to approve or reject. Approved workers will have their document updated with a 'verified: true' status.
- UI Theme Customization: Integrate a dark/light mode toggle that persists the user's preference in localStorage.
- Code generation: Suggest relevant tags for job posts based on the job description using generative AI; an LLM tool recommends relevant tags based on similar, previously successful job posts.  Admin has the choice to accept the suggestions.

## Style Guidelines:

- Primary color: Subtle dark gray (#333333) for a professional base.
- Background color: Light gray (#F0F0F0), offering a clean and neutral backdrop.
- Accent color: muted slate blue (#778899), adding a touch of sophistication while maintaining a corporate feel.
- Body and headline font: 'Inter', a sans-serif, to ensure the UI looks clean, modern, and corporate.
- Clean and consistent spacing to maintain a professional look.
- Responsive design to ensure usability across different devices.
- Use a set of minimal, consistent icons to represent different functions and data points.