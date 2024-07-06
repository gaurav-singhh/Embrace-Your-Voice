import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AddPostImage from "../../Images/AddPost_Image.png";

export default function PostForm({ post }) {
  const isDarkTheme = useSelector((state) => state.DarkMode.isDarkTheme);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    setLoading(true);
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        appwriteService.deleteFile(post.FeaturedImange);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        FeaturedImange: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.FeaturedImange = fileId;
        console.log(data);
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div
        className={`w-2/3 px-2 ${isDarkTheme ? "text-white" : "text-black"}`}
      >
        <Input
          label="Title :"
          placeholder="Title"
          className={`mb-4  text-black`}
          inputClassName={`text-white ${
            isDarkTheme ? "bg-gray-800" : "bg-white"
          }`}
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className={`mb-4  text-black`}
          inputClassName={`text-white ${
            isDarkTheme ? "bg-gray-800" : "bg-white"
          }`}
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
          className={`${isDarkTheme ? "text-white" : "text-black"}`}
        />
      </div>
      <div
        className={`w-1/3 px-2 ${isDarkTheme ? "text-white" : "text-black"}`}
      >
        <Input
          label="Featured Image :"
          type="file"
          className={`mb-4 "text-black"}`}
          inputClassName={`text-white ${
            isDarkTheme ? "bg-gray-800" : "bg-white"
          }`}
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.FeaturedImange)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className={`mb-4 "text-black"}`}
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500 hover:bg-green-400" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
        {post ? undefined : (
          <div className="w-full mt-4 hidden md:block">
            <img src={AddPostImage} alt="Add Post" className="rounded-lg" />
          </div>
        )}
      </div>
    </form>
  );
}
