import axios from "axios";
import { requestHeader } from "../../../hooks/useFetch";

const postUser = async (formInputs, history, event, selectedRoles) => {
    event.preventDefault();
    console.log(selectedRoles)

    const getSelectedRoles = () => {
        const roles = [];
        for (const role of selectedRoles) {
            roles.push({ id: role.id })
        }
        return roles
    }

    const getSelectedUserType = () => {
        const { userId, server, email, focalPointEmail, focalPointName, focalPointPhone, focalPointPosition, name, password, userType, username } = formInputs;

        if (userType === "Internal")
            return {
                name: name,
                email: email,
                username: username,
                password: password,
                userType: 'INTERNAL',
                focalPoint: {
                    name: focalPointName,
                    email: focalPointEmail,
                    phone: focalPointPhone,
                    position: focalPointPosition,
                },
                roles: getSelectedRoles()
            };
        else
            return {
                name: name,
                email: email || `${username}@gmail.com`,
                password: null,
                userType: 'EXTERNAL',
                userId: userId,
                username: username,
                userData: JSON.stringify({ "id": userId, "displayName": name, "email": email, "userCredentials": { "username": username } }),
                server: server,
                roles: getSelectedRoles()
            };
    };

    await axios
        .post(
            "https://apps.hisplp.org/mozapi/api/users",
            getSelectedUserType(),
            requestHeader()
        )
        .then((response) => {
            history.push('/umm/umm-linelist');
        })
        .catch((error) => { });
};

export { postUser }
