
import { Form, useActionData, useNavigation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import '../../styles/Components.ui.css';
import Spinner from '../ui/Spinner';
import DateComponent from '../ui/Date';
import Types from './Type';
import Categorie from './Categorie'

interface SubmissionProps {
    onSuccess?: () => void;
}

const Submission = ({ onSuccess }: SubmissionProps) => {

    const data = useActionData();
    const navigation = useNavigation();
    const navigate = useNavigate();
    const isLoading = navigation.state !== "idle";

    useEffect(() => {
        if (data?.success === true) {
            onSuccess?.();
            setTimeout(() => {
                navigate('/dashboard');
            }, 300);
        }
    }, [data?.success, onSuccess, navigate]);
    
    

    return(
        <Form method = "post" className="container p-5 d-grid justify-content-center ">
            <h3 className='text-center'>Add your project information to the directory</h3>
            {data ?. error && <p className='text-center mb-0' style = {{ color: 'red', fontWeight: 'bold' }}> {data.error} </p>}<br/>
            <div className="row d-flex justify-content-center align-items-between project-form">

                <div className ='col-md-6'>
                    
                    <span className='my-1'>
                        <label><span className='required-sign mx-2 p-0'>*</span>Project name</label>
                        <input className='form-control w-100'
                            placeholder='Project'
                            required
                            type='text'
                            name='name'
                        />
                    </span>

                    <span className='my-1'>
                        <label><span className='required-sign mx-2 p-0'>*</span>Description</label>
                        <textarea className='form-control textarea w-100 '
                                    placeholder='My project is the best startup...'
                                    required
                                    name='description'
                        />
                    </span>

                    <span className='my-1'>
                        <label><span className='required-sign mx-2 p-0'>*</span>Categories</label>
                        <Categorie />
                    </span>

                    <span className='my-1'>
                        <label><span className='required-sign mx-2 p-0'></span>Authors</label>
                        <input className='form-control textarea w-100 '
                                    placeholder='John Doe, Lucie Gray'
                                    name='author'
                        />
                    </span>

                    <span className='my-1'>
                        <label><span className='required-sign mx-2 p-0'></span>Email</label>
                        <input type='email'
                                className='form-control w-100 '
                                name ='email'
                        />
                    </span>

                    <span className='my-1'>
                        <label><span className='required-sign mx-2 p-0'></span>Github Url</label>
                        <input className='form-control w-100 '
                                name ='github'
                        />
                    </span>

                    <span className='my-1'>
                        <label><span className='required-sign mx-2 p-0'></span>Address</label>
                        <input className='form-control w-100 '
                                name ='address'
                        />
                    </span>
                    
                </div>
                
                <input type='hidden' name='intent' value='project-submission'/>

                <div className ='col-md-6'>

                    <span className=''>
                        <Types/>
                    </span>
                    
                    <span className='my-1'>
                        <label><span className='required-sign mx-2 p-0'>*</span>Needs</label>
                        <input className='form-control textarea w-100 '
                                    placeholder='Developer, designer, tester'
                                    required
                                    name='needs'
                        />
                    </span>
                    <span className='my-1'>
                        <label><span className='required-sign mx-2 p-0'></span>Audiences</label>
                        <input className='form-control textarea w-100 '
                                    placeholder='Students, general public'
                                    name='public'
                        />
                    </span>

                    <span className='my-1'>
                        <label><span className='required-sign mx-2 p-0'></span>Technologies</label>
                        <input className='form-control textarea w-100 '
                                    placeholder='HTML, CSS, JS'
                                    name='technologies'
                        />
                    </span>

                    <span className='my-1'>
                        <label><span className='required-sign mx-2 p-0'></span>Website Url</label>
                        <input type='url' className='form-control w-100 '
                                name='website'
                        />
                    </span>

                    <span className='my-1'>
                        <label><span className='required-sign mx-2 p-0'></span>X Url </label>
                        <input className='form-control w-100 '
                                name='twitter'
                        />
                    </span>

                    <span className='my-1'>
                        <label><span className='required-sign mx-2 p-0'></span>LinkedIn </label>
                        <input className='form-control w-100 '
                                name='linkedin'
                        />
                    </span>
                </div>
                    <span className='my-3 d-grid justify-content-center align-items-center'>
                        <label><span className='required-sign justify-self-center p-0'>*</span>Fouded at </label>
                        <DateComponent />
                    </span>
            </div>

            <button className='my-3 d-flex justify-content-center align-items-center'>
                { isLoading ? <Spinner color="#ffc107" size="small"/> : "Submit"}
            </button>

        </Form>
    )
}

export default Submission;