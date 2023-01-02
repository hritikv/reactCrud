import React,{useState,useEffect} from 'react'

function Crud() {
const[name,setName]=useState("")
const[email,setEmail]=useState("")
const[password,setPassword]=useState("")
const[update,setUpdate]=useState(0)
const[user,setUser]=useState([])

useEffect(()=>{
fetch("http://localhost:5000/posts").then((data)=>data.json()).then((result)=>{
setUser(result)
})
},[])
const submithandler=(e)=>{
e.preventDefault()
if(update){

    fetch("http://localhost:5000/posts/"+update,{
        method:"put",
        body:JSON.stringify({name,email,password}),
        headers:{"content-type":"application/json"}
    })
}else{

    fetch("http://localhost:5000/posts",{
        method:"post",
        body:JSON.stringify({name,email,password}),
    headers:{"content-type":"application/json"}
})
    }
}
const deleteHandler=(e)=>{
    fetch("http://localhost:5000/posts/"+e.target.value,{
        method:"delete"
    })
}
const editHandler=(e)=>{
    setName(e.name)
    setEmail(e.email)
    setPassword(e.password)
    setUpdate(e.id)
}

  return (
    <div className='container my-5
    ' >
        <form onSubmit={submithandler} className="row">
           
            <input type="text" className="form-control col" value={name} onChange={(e)=>setName(e.target.value)} placeholder="enter your name"/>
            <input className="form-control col" type="email" value={email} onChange={(e)=>setEmail(e.target.value)}
                placeholder="enter your email"
            />
            <input className="form-control col" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="enter your password"/>
            <button className='btn btn-success' type='submit'>Add</button>
        </form>
        <table className='table table-hover'>
            <thead>
                <th>name</th>
                <th>email</th>
                <th>password</th>
                 <th>edit</th>
                <th>delete</th>
            </thead>
            <tbody>
                {user.map((ele)=>{
                    return <tr key={ele.id}>
                        <td>{ele.name}</td>
                        <td>{ele.email}</td>
                        <td>{ele.password}</td>
                        <td><button className='btn btn-primary' onClick={()=>editHandler(ele)}>edit</button></td>
                        <td><button className='btn btn-danger' value={ele.id} onClick={(e)=>deleteHandler(e)}>delete</button></td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
  )
}

export default Crud