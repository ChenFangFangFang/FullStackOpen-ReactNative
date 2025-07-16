import useCreateReview from '../hooks/useCreateReview';
import { useNavigate } from 'react-router-native';  
import ReviewForm from './ReviewForm';

const CreateReview = () => {
    const [createReview] = useCreateReview();
    const navigate = useNavigate();   
    const onSubmit = async (values) => {
        try {
            const { repositoryName, ownerName, rating, text } = values;
            const ratingInt = parseInt(rating);
            
            const result = await createReview({ 
                variables: { 
                    review: { 
                        repositoryName, 
                        ownerName, 
                        rating: ratingInt,
                        text 
                    } 
                } 
            });
            
            if (result.data) {
                navigate('/');
            }
        } catch (e) {
            console.log("error", e);
        }
    };

    return <ReviewForm onSubmit={onSubmit} />;
};
export default CreateReview;