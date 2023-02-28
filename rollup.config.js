import { nodeResolve } from "@rollup/plugin-node-resolve";
import copy from "rollup-plugin-copy";

module.exports = {
  input: "index.js",
  output: {
    dir: "dist",
  },
  plugins: [
    copy({
      targets: [{ src: "index.html", dest: "dist" }, { src: "style.css", dest: "dist" }, { src: "Capture1.png", dest: "dist" }, { src: "Capture3.png", dest: "dist" }, { src: "Capture4.png", dest: "dist" }, { src: "776e9795421d4a36e17e34bfb1c935e6oFf0FiO7qBS9Nlkn-0.png", dest: "dist" }, { src: "776e9795421d4a36e17e34bfb1c935e6oFf0FiO7qBS9Nlkn-1.png", dest: "dist" }, { src: "776e9795421d4a36e17e34bfb1c935e6oFf0FiO7qBS9Nlkn-3.png", dest: "dist" }, { src: "776e9795421d4a36e17e34bfb1c935e6oFf0FiO7qBS9Nlkn-4.png", dest: "dist" }, { src: "776e9795421d4a36e17e34bfb1c935e6oFf0FiO7qBS9Nlkn-5.png", dest: "dist" }, { src: "a88572578d16f7b00971c949aecc5812_w200-0.png", dest: "dist" }, { src: "a88572578d16f7b00971c949aecc5812_w200-1.png", dest: "dist" }, { src: "a88572578d16f7b00971c949aecc5812_w200-2.png", dest: "dist" }, { src: "a88572578d16f7b00971c949aecc5812_w200-3.png", dest: "dist" }, { src: "a88572578d16f7b00971c949aecc5812_w200-4.png", dest: "dist" }, { src: "a88572578d16f7b00971c949aecc5812_w200-5.png", dest: "dist" }, { src: "a88572578d16f7b00971c949aecc5812_w200-6.png", dest: "dist" }, { src: "a88572578d16f7b00971c949aecc5812_w200-7.png", dest: "dist" }, { src: "node_modules", dest: "dist" }]
    }),
    nodeResolve(),
  ],
};