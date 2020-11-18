export const getPassword = async (passwordName) => {
  console.log(passwordName);
  const response = await fetch(`/api/passwords/${passwordName}`);
  // if(!response.ok){
  //   throw new Error(response)
  // }
  const password = await response.text();
  console.log(password);
  return password;
};
