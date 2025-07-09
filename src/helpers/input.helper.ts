export const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> , setFormData: React.Dispatch<React.SetStateAction<any>>) => {
    const { name, value } = event.target;
    setFormData((prevData : Record<string,any>) => ({ ...prevData, [name]: value }));
};
