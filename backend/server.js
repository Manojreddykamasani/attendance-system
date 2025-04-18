const express=require('express')
const supabase=require('./supabase.js')
const cors=require('cors')
const app=express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const port = process.env.PORT || 3000;
const markattendance=async(req,res)=>{
    const details=req.body;
    const {data,error}=await supabase.from('attendance').insert([details])
    if(error){
        console.log(error)
        res.status(500).json({error:'failed to mark attendance'})
    }
    else{
        res.status(200).json({message:'attendance marked successfully'})
    }
}
app.post('/markattendance',markattendance)
const getattendance = async (req, res) => {
    const details = req.body;
    const { data, error } = await supabase
      .from('attendance')
      .select('date, status')
      .eq('student_roll', details.roll);
  
    if (error) {
      console.log(error);
      res.status(500).json({ error: 'failed to get attendance' });
    } else {
      const attendanceCount = data.filter(item => item.status === 'present').length;
      const attendancePercent = (attendanceCount / data.length) * 100;
        const attendanceData = data.reduce((acc, item) => {
        acc[item.date] = item.status;
        return acc;
      }, {});
        res.status(200).json({
        attendance: attendancePercent,
        data: attendanceData
      });
    }
  };
  

app.post('/getattendance',getattendance)
app.post('/getsinglestudent',async (req,res)=>{
    const details=req.body;
    const {data,error}= await supabase.from("students").select("*").eq("rollno",details.roll)
    if(error){
        console.log(error)
        res.status(500).json({error:'failed to get student details'})
    }
    else{
        res.status(200).json(data[0])
    }
});
app.post('/getstudentdetails', async (req, res) => {
    const details = req.body;
    const {data,error}=await supabase.from("students").select("*").ilike("name",`%${details.query}%`)
    if(error){
        console.log(error)
        res.status(500).json({error:'failed to get student details'})
    }
    else{
        res.status(200).json(data)
    }
});





app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})