import { useForm } from 'react-hook-form'
import { useQuery, useMutation } from '@tanstack/react-query';
import axios, * as others from 'axios'
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

function New(){
axios.defaults.baseURL = 'http://localhost:1337'
const {register, handleSubmit} = useForm()
const [categ, setCateg] = useState([])

const genres = useQuery({
    queryKey: ['genres'],
    queryFn: async () => {
        return axios('/api/categories')
        .then(res => {
            console.log(res.data.data)
            setCateg(res.data.data)
            return res.data
        })
    }
})

const mutation = useMutation({
    mutationFn: async (data) => {
        console.log(data)
        return axios.post('/api/restaurants', {
            data: {
                Name: data.name,    
                Description: data.description,
                categories: [Number(data.category)]         
            }   
      })
    },
  })

  function submit (e){
    mutation.mutate(e)
}

if (genres.isLoading){
    return <h1> Categories loading </h1>
} if (genres.isError){
    return <h1> Cannot fetch categories from database </h1>
} 

return(
    <>
        <form onSubmit={handleSubmit(submit)}>
            <h1> Name </h1>
            <input {...register('name')} /> 

            <h1> Description </h1>
            <textarea {...register('description')} rows={5} cols={50} /> 

            <h1> Categories </h1>
            <select {...register('category')}> 
                <option value={''}> Select a Category </option>
                {
                    categ.map((el) => {
                        return <option value={el.id}> {el.attributes.Name} </option>
                    })
                }
            </select>


            <br/><br/>
            <button> Submit </button>
        </form>

        
    </>
)

}

export default New;