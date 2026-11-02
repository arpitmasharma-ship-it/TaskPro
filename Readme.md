## how to use 2 in  1 
<!--        
 <button onClick={() => { setProjects([...projects, title]), setTitle("") }}  >Add Task</button> -->


 <!-- in beckend to use =>  npm run dev 
 
 "start": "node index.js",
  "dev": "node --watch index.js"
  
  -->


  // Project Nhi mila => 404 



  ## Frontend ko Connect krna ... 
  <!-- npm install axios -->
  <!-- 
  Concept: Axios React frontend se Express backend ko API requests bhejne ke kaam aata hai.
  axios ek library hai.
Iska use frontend se backend ko HTTP requests bhejne ke liye hota hai.
Jaise project fetch karna, add karna, update karna aur delete karna.
   -->

   <!-- 
   const API — humne API naam ka variable banaya.
axios.create() — Axios ka configured instance banaya.
baseURL — backend ka common URL set kiya.
    -->



    import cors from "cors";
## This is Important ...
app.use(cors({
    origin: "http://localhost:5173"
}));

<!-- 
Line-by-line samjho


1. import cors from "cors";
- cors ek package hai.
- Ye browser ki Cross-Origin Resource Sharing (CORS) policy ko handle karta hai.


2. app.use(cors({...}))
- Ye Express mein CORS middleware enable karta hai.
- Middleware incoming requests ko process karta hai aur response mein required CORS headers add karta hai.


3. origin: "http://localhost:5173"
- Ye tumhare React frontend ka address hai.
- Iska matlab browser ko batana: is frontend ko backend ka response access karne ki permission hai.
 -->


 