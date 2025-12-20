<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->
- [x] Verify that the copilot-instructions.md file in the .github directory is created.

- [x] Clarify Project Requirements - NMIMS Leave & Productivity Analyzer (Next.js, TypeScript, MongoDB, Prisma, Tailwind CSS)
	<!-- Ask for project type, language, and frameworks if not specified. Skip if already provided. -->

- [x] Scaffold the Project
- [x] Scaffold the Project
	<!--
	Ensure that the previous step has been marked as completed.
	Call project setup tool with projectType parameter.
	Run scaffolding command to create project files and folders.
	Use '.' as the working directory.
	If no appropriate projectType is available, search documentation using available tools.
	Otherwise, create the project structure manually using available file creation tools.
	-->

- [x] Customize the Project
	<!--
	Verify that all previous steps have been completed successfully and you have marked the step as completed.
	Develop a plan to modify codebase according to user requirements.
	Apply modifications using appropriate tools and user-provided references.
	Skip this step for "Hello World" projects.
	-->

- [x] Install Required Extensions
	<!-- ONLY install extensions provided mentioned in the get_project_setup_info. Skip this step otherwise and mark as completed. -->

- [x] Compile the Project
	<!--
	Verify that all previous steps have been completed.
	Install any missing dependencies.
	Run diagnostics and resolve any issues.
	Check for markdown files in project folder for relevant instructions on how to do this.
	-->

- [x] Create and Run Task
	<!--
	Verify that all previous steps have been completed.
	Check https://code.visualstudio.com/docs/debugtest/tasks to determine if the project needs a task. If so, use the create_and_run_task to create and launch a task based on package.json, README.md, and project structure.
	Skip this step otherwise.
	 -->

- [x] Launch the Project
	<!--
	Verify that all previous steps have been completed.
	Prompt user for debug mode, launch only if confirmed.
	 -->

- [x] Ensure Documentation is Complete

## NMIMS Leave & Productivity Analyzer

✅ **Project Successfully Created and Configured!**

### Tech Stack
- **Frontend**: Next.js 16.x with React & TypeScript
- **Styling**: Tailwind CSS 
- **Database**: MongoDB with Prisma ORM
- **Excel Processing**: xlsx library

### Current Status
- ✅ Project scaffolded with Next.js
- ✅ Database schema configured for MongoDB
- ✅ API routes created for file upload and analytics
- ✅ Utility functions for attendance processing
- ✅ Development server running at http://localhost:3000
- ✅ README.md with complete project documentation

### Next Steps
1. **Setup MongoDB**: Update the DATABASE_URL in .env with your MongoDB connection string
2. **Upload Excel File**: Use the interface to upload attendance data
3. **Test Analytics**: View employee productivity and leave reports
4. **Deploy**: Ready for deployment on Vercel or Netlify

### Key Features Implemented
- Excel file upload and parsing
- Attendance data processing with business rules
- MongoDB integration with Prisma
- REST API endpoints
- Responsive UI with Tailwind CSS