import { useForm } from 'react-hook-form'; //npm i react-hook-form
import { zodResolver } from '@hookform/resolvers/zod'; // npm i @hookform/resolvers
import { email, z } from 'zod'; // npm i zod 
function Signup (){
    
    //SchemaValidation for signup form and it is attach in useform
    const signupSchema=z.object({
       firstName:z.string().min(3, "Name should contain atleast 3 char"),
      emailId:z.string().email("Invalid email address"),
       password: z.string().min(8,"Password should contain atleast 8 character")
    })
  const { register, handleSubmit, formState: { errors },} = useForm({resolver:zodResolver(signupSchema)});
    const submittedData=(data) =>{
        console.log(data);
    }
    return(
        <>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#0b1220] to-[#020617] px-4">
        
        <form onSubmit={handleSubmit((data) => console.log(data))} 
        className='w-full max-w-md rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl p-10 flex flex-col text-white'> 
            
            {/* here ...register is a function which return a object and whose take the argument and print and handle may tasks */}
            
            <h2 className="text-3xl font-semibold text-center mb-6 tracking-wide">Leetcode</h2>

            <div className="space-y-4">

                <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-300">First Name</label>
                    <input {...register('firstName')}
                    placeholder='John'
                    className="input input-bordered w-full bg-white/5 border-white/20 text-white placeholder:text-gray-400" /> 
                    {errors.firstName && (<span className="text-error text-xs">{errors.firstName.message}</span>)} 
                </div>

                {/* Its means that is errors.firtName exists then second condition is print and if first condition is false then first is return*/ }

                <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-300">Email</label>
                    <input {...register('emailId')}
                    placeholder='john@example.com'
                   
                   className="input input-bordered w-full bg-white/5 border-white/20 text-white placeholder:text-gray-400" />
                   {errors.emailId && (<span className="text-error text-xs">{errors.emailId.message}</span>)}
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-300">Password</label>
                    <input {...register('password')}
                    placeholder='••••••••' 
                    type="password"
                    className="input input-bordered w-full bg-white/5 border-white/20 text-white placeholder:text-gray-400" />
                    {errors.password && (
                    <span className="text-error text-xs">{errors.password.message}</span>)}
                </div>

            </div>

             <div className="flex justify-center mt-8">
                <button type="submit" 
                className='btn btn-primary px-10 text-base font-semibold tracking-wide shadow-lg shadow-primary/30'>
                Sign Up
                </button>
             </div>

         </form>
         </div>
        </>
     )}
export default Signup;