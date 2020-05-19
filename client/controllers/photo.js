export const handlePhotoPreview = (e, setFile) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = event => setFile({file, photo: event.target.result});

    reader.readAsDataURL(file);
};