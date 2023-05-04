import './Load.css';

import Load from '../../components/Load/Load';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Position } from 'reactflow';
function LoadPage() {

    const onFileChange = (files) => {
        console.log(files);
    }

    return (
        <div className='load-page'>
        <div className="load-box">
             <h2 className="title" >
            Upload your files
             </h2>
            <Load
                onFileChange={(files) => onFileChange(files)}
            />



        </div>
       <div>
      
        </div>
        </div>
    );
}

export default LoadPage;