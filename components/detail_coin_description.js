export default function Description(props){
    return (
        <>
        <div className=' mt-2 h-full'>
        <h3 className='font-bold text-lg text-purple-700'> About {props.id} : </h3>
        <p className='text-sm overflow-scroll h-32 mt-2 rounded-md p-2 white font-semibold shadow-2xl'> {props.desc} </p>
        </div>
        </>
    )
}