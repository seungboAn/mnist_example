import { useState, useEffect } from 'react';

export default function ImageUploadForm() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [result, setResult] = useState("")

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setResult(data.predicted_digit)
    } catch (error) {
      console.error('업로드 실패:', error);
    }
  };

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreviewUrl(null);
    }
  }, [image]);

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <div className='flex gap-4' style={{ width: '200px', height: '200px'}}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
              setImage(e.target.files[0])
          }}
        />
        {previewUrl && (
          <img src={previewUrl} alt="Preview" style={{ maxWidth: '150px', maxHeight: '150px', marginTop: '20px' }} />
        )}
      </div>
      <div className='flex gap-4'>
        <button 
          onClick={handleSubmit}
          className={`bg-blue-500 text-white px-4 py-2 rounded}`}
          style={{ width: '250px', height: '50px' }} 
          >
              <p>Predict</p>
          </button>
        <button 
        onClick={() => setImage(null)}
        className={`bg-blue-500 text-white px-4 py-2 rounded}`}
        style={{ width: '250px', height: '50px' }} 
        >
            <p>Reset</p>
        </button>
      </div>
      <div>
        {result && <p>예측한 값은 {result}입니다.</p>}
      </div>
    </form>
  );
}