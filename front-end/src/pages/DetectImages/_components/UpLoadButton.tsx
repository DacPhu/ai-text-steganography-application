
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const UpLoadButton = ({className}: any, { ...props }) => (
    <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        className={className}
        {...props}
    >
        Choose file
        <input type="file" hidden />
    </Button>
);
export default UpLoadButton;