// "use client";

// import styled from 'styled-components';
// import UploadFile from '../../assets/update-report/upload-icon.svg';
// import ErrorIcon from '../../assets/input/Info.svg';

// const ErrorContainer = styled.div`
//   margin-top: 8px;
//   display: flex;
//   align-items: center;
//   gap: 6px;
// `;

// const ErrorMessage = styled.span`
//   color: #ff0000;
// `;

// const Container = styled.div`
//   position: relative;
//   width: 100%;
//   ${({ className }) => className}
// `;

// const Label = styled.p`
//   font-family: 'font-primary';
//   margin-bottom: 8px;
// `;

// const UploadLabel = styled.label`
//   width: 100%;
//   height: 100%;
//   border-radius: 10px;
//   border: 1.5px solid ${({ error }) => (error ? '#FF0000' : 'rgba(224, 224, 224, 1)')};
//   padding: 20px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   cursor: pointer;
// `;

// const UploadedImageContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 14px;
// `;

// const UploadButton = styled.button`
//   height: 42px;
//   width: 100%;
//   border: 1px solid rgba(224, 224, 224, 1);
//   border-radius: 4px;
//   font-weight: bold;
//   color: #a33c3d;
// `;

// const Image = styled.img`
//   max-height: 100%;
//   max-width: 100%;
//   border-radius: 4px;
//   width: 100%;
// `;

// const UploadedImage = ({ src }) => (
//   <UploadedImageContainer>
//     <Image src={src} alt="Uploaded" />
//     <UploadButton>Ubah Foto</UploadButton>
//   </UploadedImageContainer>
// );

// const UploadPlaceholder = () => (
//   <div className="flex h-[141px] w-[320px] justify-center items-center flex-col gap-[14px]">
//     <img src={UploadFile} alt="" />
//     <p className="text-[#A33C3D] font-normal text-[16px]">Upload file</p>
//   </div>
// );

// export default function InputImage({
//   label,
//   onChange,
//   previewImage,
//   existingImageUrl,
//   className,
//   error,
//   errorMessage,
// }) {
//   return (
//     <Container className={className}>
//       <Label>{label}</Label>
//       <UploadLabel htmlFor="image-upload" error={error}>
//         {previewImage || existingImageUrl ? (
//           <UploadedImage src={previewImage || existingImageUrl} />
//         ) : (
//           <UploadPlaceholder />
//         )}
//         <input
//           id="image-upload"
//           type="file"
//           accept="image/*"
//           className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
//           onChange={onChange}
//         />
//       </UploadLabel>
//       {error && (
//         <ErrorContainer>
//           <img className="h-[16px] w-auto" src={ErrorIcon} alt="" />
//           <ErrorMessage>{errorMessage}</ErrorMessage>
//         </ErrorContainer>
//       )}
//     </Container>
//   );
// }
