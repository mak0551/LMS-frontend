import { useState } from "react";
import axios from "axios";

const CreateCourse = () => {
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    teacher: "",
    skillsRequired: [],
    level: "Beginner",
    duration: { hours: 0, minutes: 0 },
    price: 0,
  });

  const [newSkill, setNewSkill] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("duration.")) {
      const key = name.split(".")[1];
      setCourseData((prev) => ({
        ...prev,
        duration: { ...prev.duration, [key]: parseInt(value, 10) || 0 },
      }));
    } else {
      setCourseData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const addSkill = () => {
    if (newSkill.trim() !== "") {
      setCourseData((prev) => ({
        ...prev,
        skillsRequired: [...prev.skillsRequired, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (index) => {
    setCourseData((prev) => ({
      ...prev,
      skillsRequired: prev.skillsRequired.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4040/course/create",
        courseData
      );
      alert("Course added successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error adding course:", error.message);
      alert("Failed to add course.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Add New Course
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Course Title"
          value={courseData.title}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
          required
        />

        <textarea
          name="description"
          placeholder="Course Description"
          value={courseData.description}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
          required
        />

        <input
          type="text"
          name="teacher"
          placeholder="Teacher ID"
          value={courseData.teacher}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
          required
        />

        <div>
          <h4 className="text-lg font-semibold mb-2">Skills Required</h4>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add Skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
            />
            <button
              type="button"
              onClick={addSkill}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Add
            </button>
          </div>

          <ul className="mt-2 space-y-1">
            {courseData.skillsRequired.map((skill, index) => (
              <li
                key={index}
                className="flex justify-between bg-gray-100 p-2 rounded-lg"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✖
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Level</h4>
          <select
            name="level"
            value={courseData.level}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Duration</h4>
          <div className="flex gap-4">
            <input
              type="number"
              name="duration.hours"
              placeholder="Hours"
              value={courseData.duration.hours}
              onChange={handleChange}
              className="w-1/2 p-3 border rounded-lg focus:ring focus:ring-blue-300"
            />
            <input
              type="number"
              name="duration.minutes"
              placeholder="Minutes"
              value={courseData.duration.minutes}
              onChange={handleChange}
              className="w-1/2 p-3 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>
        </div>

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={courseData.price}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
          required
        />

        <button
          type="submit"
          className="w-full bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-500 transition"
        >
          Add Course
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
