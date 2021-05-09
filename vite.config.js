
import { resolve } from "path";
import legacy from "@vitejs/plugin-legacy";
import glob from "glob";
import autoprefixer from "autoprefixer";
import uncss from "postcss-uncss";

const isProd = process.env.NODE_ENV === "production";

const files = glob.sync("./src/pages/**/*.html");

const getPath = (path = "",fileName = "index.html")=>{
	return resolve(__dirname, `src/pages/${!path ? "" : path + "/"}${fileName}`);
}

const inputs = files.reduce((acc,val)=>{
	val = val.replace("./src/pages/","");
	const folders = val.split("/");
	const isFolderIndexHtml = /index\.html$/.test(val);
	const isFirstLevelFolder = folders.length > 1;
	
	if (val === "index.html"){
		acc.main = getPath()
	}else if ( isFirstLevelFolder){
		const fileName = folders[folders.length - 1];
		const folderPaths = folders.splice(0,folders.length - 1);
		const dir = folderPaths.join("/");
		
		if (fileName !== "index.html"){
			folderPaths.push(fileName.replace(/\.html$/,""))
		}

		acc[folderPaths.join(".")] = getPath(dir,fileName)
	}
	
	return acc;
},{})

export default {
	build: {
		rollupOptions: {
			input: inputs,
			output: {
				entryFileNames: `assets/js/[name].js`,
      		chunkFileNames: `assets/chunks/[name].js`,
		      assetFileNames: (e)=>{
	      		if (/\.css$/.test(e.name)) return "assets/css/[name].[hash].css"
	
	        		return "assets/[name].[hash].[ext]"
		      }
			}
		},
		outDir: "../../dist",
		emptyOutDir: true,
	},
	// css: {
	// 	postcss: {
	// 		plugins: [
				
	// 				autoprefixer({ grid: "autoplace"}),
	// 				uncss({ html: ["./src/pages/**/*.html"]})
			
	// 		]
	// 	}
	// },
	root: "./src",
	publicDir: "../public"
}
