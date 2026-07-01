import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../state_management/AuthContext";
import { api } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const instructorSchema = z.object({
  professionalTitle: z
    .string()
    .min(3, "Professional title must be at least 3 characters"),

  bio: z.string().min(50, "Bio must be at least 50 characters"),

  experience: z.coerce.number().min(0, "Experience cannot be negative"),

  linkedinUrl: z.string().url("Enter a valid URL").optional().or(z.literal("")),

  websiteUrl: z.string().url("Enter a valid URL").optional().or(z.literal("")),

  expertise: z.array(z.string()).min(1, "Add at least one skill"),
});

export default function InstructorForm() {
  const [skillInput, setSkillInput] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(instructorSchema),
    defaultValues: {
      professionalTitle: "",
      bio: "",
      experience: 0,
      linkedinUrl: "",
      websiteUrl: "",
      expertise: [],
    },
  });

  const skills = watch("expertise");

  const addSkill = () => {
    const skill = skillInput.trim();

    if (!skill) return;

    if (!skills.includes(skill)) {
      setValue("expertise", [...skills, skill], {
        shouldValidate: true,
      });
    }

    setSkillInput("");
  };

  const removeSkill = (skill) => {
    setValue(
      "expertise",
      skills.filter((s) => s !== skill),
      { shouldValidate: true },
    );
  };

  const onSubmit = async (data) => {
    try {
      await api.put(`/users/become-instructor/${user?.user?._id}`, {
        instructorData: data,
      });
      toast.success("you are now a Instructor");
      navigate(`/mycourses`);
    } catch (error) {
      console.error("Error posting modules:", error);
      toast.error(error.response?.data?.message || "An error occurred while submitting the form.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-2">Become an Instructor</h1>

        <p className="text-gray-500 mb-8">
          Share your knowledge and start teaching students around the world.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Professional Title */}
          <div>
            <label className="block mb-2 font-medium">Professional Title</label>

            <input
              {...register("professionalTitle")}
              placeholder="MERN Stack Developer"
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            {errors.professionalTitle && (
              <p className="text-red-500 text-sm mt-1">
                {errors.professionalTitle.message}
              </p>
            )}
          </div>

          {/* Bio */}
          <div>
            <label className="block mb-2 font-medium">About You</label>

            <textarea
              {...register("bio")}
              rows={6}
              placeholder="Tell students about your experience, skills and teaching style..."
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            {errors.bio && (
              <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
            )}
          </div>

          {/* Experience */}
          <div>
            <label className="block mb-2 font-medium">
              Years of Experience
            </label>

            <input
              type="number"
              {...register("experience")}
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            {errors.experience && (
              <p className="text-red-500 text-sm mt-1">
                {errors.experience.message}
              </p>
            )}
          </div>

          {/* Skills */}
          <div>
            <label className="block mb-2 font-medium">Expertise / Skills</label>

            <div className="flex gap-2">
              <input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="React"
                className="flex-1 border rounded-lg p-3"
              />

              <button
                type="button"
                onClick={addSkill}
                className="px-5 bg-blue-600 text-white rounded-lg"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {skills.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                >
                  {skill}

                  <button type="button" onClick={() => removeSkill(skill)}>
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {errors.expertise && (
              <p className="text-red-500 text-sm mt-2">
                {errors.expertise.message}
              </p>
            )}
          </div>

          {/* LinkedIn */}
          <div>
            <label className="block mb-2 font-medium">LinkedIn URL</label>

            <input
              {...register("linkedinUrl")}
              placeholder="https://linkedin.com/in/your-profile"
              className="w-full border rounded-lg p-3"
            />

            {errors.linkedinUrl && (
              <p className="text-red-500 text-sm mt-1">
                {errors.linkedinUrl.message}
              </p>
            )}
          </div>

          {/* Website */}
          <div>
            <label className="block mb-2 font-medium">Portfolio Website</label>

            <input
              {...register("websiteUrl")}
              placeholder="https://yourwebsite.com"
              className="w-full border rounded-lg p-3"
            />

            {errors.websiteUrl && (
              <p className="text-red-500 text-sm mt-1">
                {errors.websiteUrl.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
}
