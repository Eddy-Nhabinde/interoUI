import axios from "axios";
import { requestHeader } from "../../../hooks/useFetch";

const userUpdate = async (formInputs, history, event) => {
    event.preventDefault();

    const jsonForm = {
        "id": formInputs.id,
        "name": formInputs.name,
        "email": formInputs.email,
        "password": "Dhis22022!",
        "userType": "INTERNAL",
        "focalPoint": {
            "id": 2,
            "name": "John Doe",
            "email": "jdoe@email.com",
            "phone": formInputs.phone,
            "position": formInputs.position
        },
        "permissions": [
            {
                "id": 1
            }
        ]
    }

    await axios.put("https://apps.hisplp.org/mozapi/api/users", jsonForm,requestHeader())
        .then((response) => {
            history.push('/umm/umm-linelist');
        })
        .catch((error) => { });
}
export { userUpdate }