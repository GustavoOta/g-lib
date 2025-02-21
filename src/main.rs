use std::fs;
use std::io::prelude::*;
use std::path::Path;

fn main() {
    // Check if file named export.ini exists if not create it
    if !Path::new("export.ini").exists() {
        let mut file = fs::File::create("export.ini").unwrap();
        file.write_all(b"[gravis.js]\n\n").unwrap();
        file.write_all(b"[rawCSS.js]\n\n").unwrap();
        file.write_all(b"[rawHTML.js]\n\n").unwrap();
    }

    // Load the values of lines from the file named export.ini and separate them into 3 different vectors
    let mut gravis = Vec::new();
    let mut rawcss = Vec::new();
    let mut rawhtml = Vec::new();
    let mut current = None;

    let content = fs::read_to_string("export.ini").unwrap();
    for line in content.lines() {
        if line.starts_with('[') {
            current = match line {
                "[gravis.js]" => Some(&mut gravis),
                "[rawCSS.js]" => Some(&mut rawcss),
                "[rawHTML.js]" => Some(&mut rawhtml),
                _ => None,
            };
        } else if let Some(ref mut current) = current {
            current.push(line);
        }
    }

    // Copy files based on the vectors
    for path in &gravis {
        fs::copy("./js/gravis.js", path).unwrap();
    }

    for path in &rawcss {
        fs::copy("./js/rawCSS.js", path).unwrap();
    }

    for path in &rawhtml {
        fs::copy("./js/rawHTML.js", path).unwrap();
    }
}
