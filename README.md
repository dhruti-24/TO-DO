📝 To-Do List App

A clean and modern To-Do List Web App built by Dhruti, using HTML, CSS, JavaScript (Frontend) and Node.js, Express, MongoDB Atlas (Backend).  
This app allows users to Add, Edit, Delete, Mark Complete, and Filter tasks with real-time data saved in the MongoDB cloud database.

 🚀 Features

➕ Add new tasks instantly  
🖊️ Edit or rename tasks  
✅ Mark tasks as complete or incomplete  
🗑️ Delete tasks individually or clear all completed  
🔍 Filter tasks by **All / Active / Completed**  
🌐 Backend connected to **MongoDB Atlas**  
💾 Data persistence — all tasks are saved permanently  
💻 Clean, modern, and fully responsive UI  

🛠️ Tech Stack

Frontend
- HTML5  
- CSS3 (Modern gradient UI)
- Vanilla JavaScript (Fetch API)

Backend
- Node.js  
- Express.js  
- MongoDB Atlas  
- Mongoose  
- dotenv  
- CORS enabled  

📁 Folder Structure

TO DO/
│
├── front/ # Frontend files
│ ├── index.html
│ ├── style.css
│ └── script.js
│
├── back/ # Backend files
│ ├── server.js
│ ├── package.json
│ └── .env
│
└── README.md


---

⚙️ Setup & Installation

1️⃣ Clone the Repository
git clone https://github.com/Dhruti7s/todo-list.git
cd todo-list

2️⃣ Setup Backend
cd back
npm install

3️⃣ Create .env File
Inside your back folder, create a .env file and add:
MONGO_URI=your_mongodb_atlas_connection_string
PORT=4000

4️⃣ Start the Backend Server
node server.js
✅ The backend will run on:
http://localhost:4000

You’ll see:

🚀 Server running at http://localhost:4000
✅ MongoDB Connected

5️⃣ Run the Frontend
Open front/index.html in your browser



🌐 API Endpoints

Method	       Endpoint              	Description
GET         	/api/tasks	            Fetch all tasks
POST        	/api/tasks	            Add a new task
PUT	          /api/tasks/:id	        Update / Mark complete
DELETE	      /api/tasks/:id	        Delete a specific task


💡 Future Improvements

🔐 User authentication (Login/Signup)
🌗 Dark / Light mode toggle
🕓 Task due dates & notifications
☁️ Deploy frontend (Netlify) + backend (Render)




👩‍💻 Developed By

Dhruti Parikh
parikhdhruti7@gmail.com



