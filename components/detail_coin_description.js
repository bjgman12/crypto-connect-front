export default function Description(props){
    return (
        <>
        <div className='text-white mt-2 h-full'>
        <h3 className='font-bold text-lg'> About {props.id} : </h3>
        <p className='text-sm overflow-hidden h-32 mt-2 rounded-md p-2 bg-gray-800'> {props.desc} </p>
        </div>
        </>
    )
}