
import { Form, useActionData,useNavigation } from 'react-router-dom';
import '../../styles/Components.ui.css';
import Spinner from '../ui/Spinner';
import DateComponent from '../ui/Date';
import Types from './Type';

interface UpdateProps {
    id: any
}

const Submission = ({id}: UpdateProps) => {

    const data = useActionData();
    const navigation = useNavigation();
    const isLoading = navigation.state !== "idle"

    return(
        <Form method = "post" className="container p-5 d-grid justify-content-center ">
            <h3 className='text-center'>Add your project information to the directory</h3>
            {data ?. error && <p className='text-center mb-0' style = {{ color: 'red', fontWeight: 'bold' }}> {data.error} </p>}<br/>
            <div className="row d-flex justify-content-center align-items-between project-form">

                
                <div className ='col-md-6'>
                    
                    <span className='my-1'>
                        <label>Project name</label>
                        <input className='form-control w-70'                            
                            type='text'
                            name='name'
                        />
                    </span>

                    <span className='my-1'>
                        <label>Description</label>
                        <textarea className='form-control textarea w-70 '                                    
                                    name='description'
                        />
                    </span>

                    <span className='my-1'>
                        <label><span className='required-sign mx-2 p-0'></span>Authors</label>
                        <textarea className='form-control textarea w-70 '
                                    name='author'
                        />
                    </span>

                    <span className='my-1'>
                        <label><span className='required-sign mx-2 p-0'></span>Email</label>
                        <input type='email'
                                className='form-control w-70 '
                                name ='email'
                        />
                    </span>

                    <span className='my-1'>
                        <label><span className='required-sign mx-2 p-0'></span>Github Url</label>
                        <input className='form-control w-70 '
                                name ='github'
                        />
                    </span>

                    <span className='my-1'>
                        <label><span className='required-sign mx-2 p-0'></span>Address</label>
                        <input className='form-control w-70 '
                                name ='address'
                        />
                    </span>
                    
                </div>
                
                <input type='hidden' name='intent' value='project-update'/>
                <input type='hidden' name='ident' value={id} />

                <div className ='col-md-6'>

                    <span className=''>
                        <Types/>
                    </span>
                    
                    <span className='my-1'>
                        <label>Needs</label>
                        <textarea className='form-control textarea w-70 '                                    
                                    name='needs'
                        />
                    </span>
                    
                    <span className='my-1'>
                        <label><span className='required-sign mx-2 p-0'></span>Audiences</label>
                        <textarea className='form-control textarea w-70 '
                                    name='public'
                        />
                    </span>

                    <span className='my-1'>
                        <label>Website Url</label>
                        <input type='url' className='form-control w-70 '                                
                                name='website'
                        />
                    </span>

                    <span className='my-1'>
                        <label><span className='required-sign mx-2 p-0'></span>X Url </label>
                        <input className='form-control w-70 '
                                name='twitter'
                        />
                    </span>

                    <span className='my-1'>
                        <label><span className='required-sign mx-2 p-0'></span>LinkedIn </label>
                        <input className='form-control w-70 '
                                name='linkedin'
                        />
                    </span>

                    <span className='my-1'>
                        <label>Fouded at </label>
                        <DateComponent />
                    </span>
                </div>
            </div>

            <button className='my-3 d-flex justify-content-center align-items-center'>
                { isLoading ? <Spinner color="#ffc107" size="small"/> : "Submit"}
            </button>

        </Form>
    )
}

export default Submission;