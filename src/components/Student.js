import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default () => {

    const [students, setStudents] = useState({})
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [id, setId] = useState('')

    useEffect(() => {
        getstudents()
    }, [])

    const getstudents = async () => {
        const result = await axios.get(`http://localhost:8000/api/students`)
        console.log(result.data)
        setStudents(result.data)
    }


    const addstudent = async () => {
        const result = await axios.post(`http://localhost:8000/api/students`, {
            name,
            surname,
            id
        })
        console.log(result.data)
        getstudents()
    }

    const getstudent = async (list) => {
        const result = await axios.get(`http://localhost:8000/api/students/${list}`)
        console.log(result.data)
        setName(result.data.name)
        setSurname(result.data.surname)
        setId(result.data.id)
    }
    const updatestudent = async (list) => {
        const result = await axios.put(`http://localhost:8000/api/students/${list}`, {
            name,
            surname,
            id
        })

        console.log(result.data)
        setName(result.data.name)
        setSurname(result.data.surname)
        setId(result.data.id)
        getstudents()
    }

    const delstudent = async (list) => {
        const result = await axios.delete(`http://localhost:8000/api/students/${list}`)
        getstudents()
    }

    const printstudents = () => {
        if (students && students.length)
            return students.map((student, index) => {
                return (
                    <li key={index}>
                        {student.name}: {student.surname} : {student.id}
                        <button onClick={() => getstudent(student.list)}> Get </button>
                        <button onClick={() => delstudent(student.list)}> Delete </button>
                        <button onClick={() => updatestudent(student.list)}> Update </button>
                    </li>
                )
            })
        else {
            return (<h5> No student </h5>)
        }

    }

    return (
        <div>
            <h2>Students List</h2>
            <ul>
                {printstudents()}
            </ul>
            <h2>Get student</h2>
            Get : {name} <br/>
            Get : {surname} <br/>
            Get : {id}

            <h2>Add student</h2>
            name:
            <input
                placeholder="name"
                type="text"
                name="name"
                onChange={(e) => setName(e.target.value)}
            /> <br />
            surname:
                <input
                placeholder="surname"
                type="text"
                name="surname"
                onChange={(e) => setSurname(e.target.value)}
            /> <br />
            id:
            <input
                type="text"
                name="id"
                onChange={(e) => setId(e.target.value)}
            /><br />
            <button onClick={addstudent}>Add </button>
        </div>
    )
}