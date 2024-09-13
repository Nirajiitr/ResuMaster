import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

export default ({mode})=>{
 const env = loadEnv(mode, path.resolve(__dirname, "../"), "");

return defineConfig({

  plugins: [react()],
  define: {
    "process.env" : env,
  },
});

}