import logo from '@/assets/logo.svg';
function Logo() {
  return (
    <div className='flex items-center gap-3 font-semibold text-lg'>
        <img src={logo} alt="logo" className='w-6 h-6'/>
        Saadhya
    </div>
  )
}

export default Logo