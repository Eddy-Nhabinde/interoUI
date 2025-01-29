const loadDetails = (userData) => {
  console.log(userData);
  if (userData.userType === "EXTERNAL") {
    return {
      name: userData.name,
      position: "Developer",
      email: userData.email,
      phone: 844950492,
      username: userData.username,
      id: userData.id,
    };
  } else {
    return {
      name: userData.name,
      email: userData.email,
      username: userData.username,
      id: userData.id,
      focalPointName: userData.focalPoint && userData.focalPoint.name,
      focalPointEmail: userData.focalPoint && userData.focalPoint.email,
      focalPointPhone: userData.focalPoint && userData.focalPoint.phone,
      focalPointPosition: userData.focalPoint && userData.focalPoint.position,
    };
  }
};

export { loadDetails };
