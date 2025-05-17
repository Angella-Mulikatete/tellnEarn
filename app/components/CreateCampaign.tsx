/* eslint-disable @typescript-eslint/no-unused-vars */
// components/CreateCampaignForm.tsx
"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import abiJson from "../constants/abi.json";
import { writeContract, waitForTransactionReceipt } from '@wagmi/core';
//import { type Abi } from 'wagmi';
import { config } from "../constants/config";
import Image from "next/image";



interface FormData {
  productName: string;
  description: string;
  productLink: string;
  rewardPerResponse: string;
  maxResponses: string;
}

export default function CreateCampaignForm() {
   const [image, setImage] = useState<File | null>(null);
   const [imagePreview, setImagePreview] = useState("/campaign.jpg");
  const [formData, setFormData] = useState<FormData>({
    productName: "",
    description: "",
    productLink: "",
    rewardPerResponse: "",
    maxResponses: ""
  });

  const CONTRACT_ADDRESS = "0xCA0d2E3f0504Cdce1cd323ACD8c1bEA1843Ec9fA";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setImage(file);
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       if (e.target?.result) {
  //         setImagePreview(e.target.result as string);
  //       }
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleSubmit = async () => {
    const tx = await writeContract(config, {
      address: CONTRACT_ADDRESS,
      abi: abiJson.abi,
      functionName: "createCampaign",
      args: [
        formData.productName,
        formData.description,
        formData.productLink,
        BigInt(formData.rewardPerResponse),
        BigInt(formData.maxResponses)
      ],
    });

    await waitForTransactionReceipt(config, { hash: tx });
    alert("Campaign created!");
  };

  return (
     <form onSubmit={handleSubmit} className="space-y-4">
      {/* Product Name */}
      <Input
        name="productName"
        placeholder="Product Name"
        value={formData.productName}
        onChange={handleChange}
      />

      {/* Description */}
      <Textarea
        name="description"
        placeholder="Describe the product..."
        value={formData.description}
        onChange={handleChange}
      />

      {/* Product Link */}
      <Input
        name="productLink"
        placeholder="Product Link"
        value={formData.productLink}
        onChange={handleChange}
      />

      {/* Reward Per Response */}
      <Input
        name="rewardPerResponse"
        placeholder="Reward Per Response (in USDC)"
        value={formData.rewardPerResponse}
        onChange={handleChange}
      />

      {/* Max Responses */}
      <Input
        name="maxResponses"
        placeholder="Max Responses"
        value={formData.maxResponses}
        onChange={handleChange}
      />


      <Button
        type="submit"
        className="w-full mt-4 bg-tellnearn-yellow text-black hover:bg-tellnearn-yellow/90"
      >
        Create Campaign
      </Button>
    </form>
  );
}






      {/* Product Image Upload */}
      {/* <div>
        <label className="block text-sm font-medium mb-1">Product Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          title="Product Image Upload"
          className="w-full border border-border/40 rounded-md p-2 bg-secondary text-white"
        />
        {imagePreview && (
          <div className="mt-2">
            <Image
              src={imagePreview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-md"
              height={100}
              width={100}
            />
          </div>
        )}
      </div> */}

      {/* Preview Campaign Card */}
      {/* <div className="mt-6">
        <h4 className="text-sm font-semibold mb-2">Preview:</h4>
        <div className="bg-secondary border border-border/40 rounded-xl overflow-hidden transition-all hover:border-tellnearn-yellow/50">
          <Image
            src={imagePreview}
            alt={formData.productName || "Campaign"}
            className="w-full h-48 object-cover"
            height={100}
            width={100}
          />
          <div className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-white">
                  {formData.productName || "Product Name"}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {formData.description || "Describe the product..."}
                </p>
              </div>
              <span className="text-xs px-2 py-1 bg-tellnearn-yellow/10 text-tellnearn-yellow rounded">
                Product
              </span>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm">
                <span className="text-tellnearn-yellow">
                  ${parseFloat(formData.rewardPerResponse) || 0}
                </span>{" "}
                per review
              </div>
              <button
                type="button"
                className="text-sm px-3 py-1 bg-tellnearn-yellow text-black rounded hover:bg-tellnearn-yellow/90"
              >
                Give Feedback
              </button>
            </div>
          </div>
        </div>
      </div> */}

      {/* Submit Button */}



      
// import React, { useState } from "react";

// const CreateCampaignForm = () => {
//   const [formData, setFormData] = useState({
//     productName: "",
//     description: "",
//     productLink: "",
//     rewardPerResponse: "",
//     maxResponses: "",
//   });

//   const [image, setImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState("/campaign.jpg"); // fallback image

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setImagePreview(e.target.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Combine formData and image into one object
//     const campaignData = {
//       ...formData,
//       rewardInUSDC: parseFloat(formData.rewardPerResponse),
//       maxResponses: parseInt(formData.maxResponses),
//       image: imagePreview,
//     };

//     console.log("Submitted Campaign Data:", campaignData);

//     // Here you can send this to your smart contract or backend
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       {/* Product Name */}
//       <Input
//         name="productName"
//         placeholder="Product Name"
//         value={formData.productName}
//         onChange={handleChange}
//       />

//       {/* Description */}
//       <Textarea
//         name="description"
//         placeholder="Describe the product..."
//         value={formData.description}
//         onChange={handleChange}
//       />

//       {/* Product Link */}
//       <Input
//         name="productLink"
//         placeholder="Product Link"
//         value={formData.productLink}
//         onChange={handleChange}
//       />

//       {/* Reward Per Response */}
//       <Input
//         name="rewardPerResponse"
//         placeholder="Reward Per Response (in USDC)"
//         value={formData.rewardPerResponse}
//         onChange={handleChange}
//       />

//       {/* Max Responses */}
//       <Input
//         name="maxResponses"
//         placeholder="Max Responses"
//         value={formData.maxResponses}
//         onChange={handleChange}
//       />

//       {/* Product Image Upload */}
//       <div>
//         <label className="block text-sm font-medium mb-1">Product Image</label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageChange}
//           className="w-full border border-border/40 rounded-md p-2 bg-secondary text-white"
//         />
//         {imagePreview && (
//           <div className="mt-2">
//             <img
//               src={imagePreview}
//               alt="Preview"
//               className="w-full h-48 object-cover rounded-md"
//             />
//           </div>
//         )}
//       </div>

//       {/* Preview Campaign Card */}
//       <div className="mt-6">
//         <h4 className="text-sm font-semibold mb-2">Preview:</h4>
//         <div className="bg-secondary border border-border/40 rounded-xl overflow-hidden transition-all hover:border-tellnearn-yellow/50">
//           <img
//             src={imagePreview}
//             alt={formData.productName || "Campaign"}
//             className="w-full h-48 object-cover"
//           />
//           <div className="p-4">
//             <div className="flex justify-between items-start">
//               <div>
//                 <h3 className="font-bold text-white">
//                   {formData.productName || "Product Name"}
//                 </h3>
//                 <p className="text-sm text-muted-foreground line-clamp-2">
//                   {formData.description || "Describe the product..."}
//                 </p>
//               </div>
//               <span className="text-xs px-2 py-1 bg-tellnearn-yellow/10 text-tellnearn-yellow rounded">
//                 Product
//               </span>
//             </div>
//             <div className="mt-4 flex justify-between items-center">
//               <div className="text-sm">
//                 <span className="text-tellnearn-yellow">
//                   ${parseFloat(formData.rewardPerResponse) || 0}
//                 </span>{" "}
//                 per review
//               </div>
//               <button
//                 type="button"
//                 className="text-sm px-3 py-1 bg-tellnearn-yellow text-black rounded hover:bg-tellnearn-yellow/90"
//               >
//                 Give Feedback
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Submit Button */}
//       <Button
//         type="submit"
//         className="w-full mt-4 bg-tellnearn-yellow text-black hover:bg-tellnearn-yellow/90"
//       >
//         Create Campaign
//       </Button>
//     </form>
//   );
// };

// // Reusable Input Component
// const Input = ({ name, placeholder, value, onChange }) => (
//   <input
//     name={name}
//     placeholder={placeholder}
//     value={value}
//     onChange={onChange}
//     className="w-full border border-border/40 rounded-md p-2 bg-secondary text-white placeholder:text-muted-foreground"
//   />
// );

// // Reusable Textarea Component
// const Textarea = ({ name, placeholder, value, onChange }) => (
//   <textarea
//     name={name}
//     placeholder={placeholder}
//     value={value}
//     onChange={onChange}
//     rows={3}
//     className="w-full border border-border/40 rounded-md p-2 bg-secondary text-white placeholder:text-muted-foreground resize-none"
//   />
// );

// // Reusable Button Component
// const Button = ({ children, className, type = "button" }) => (
//   <button
//     type={type}
//     className={`px-4 py-2 rounded-md text-sm font-medium ${className}`}
//   >
//     {children}
//   </button>
// );

// export default CreateCampaignForm;
