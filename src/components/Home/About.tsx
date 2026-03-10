
import dev from '../../assets/DKD.jpg'

const About = () => {
    return(
        <div className="container my-5">
            <h1>About</h1>
            <span className='d-flex justify-content-center about'>
                <img alt='dev-picture' src={dev} className='d-flex align-items-start about-img'/>
                <p className='d-flex align-items-end text-start mx-3 w-50'>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis repellat magni nostrum assumenda voluptatem voluptatibus facilis porro, ducimus odio esse culpa excepturi doloribus facere incidunt autem, ea blanditiis repudiandae voluptas!
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt architecto laborum quasi consequuntur earum itaque! Harum, consequuntur, alias blanditiis beatae necessitatibus expedita, eaque atque cupiditate et ducimus illum vel. Alias!
                    
                </p>
            </span>
        </div>
    )
}

export default About