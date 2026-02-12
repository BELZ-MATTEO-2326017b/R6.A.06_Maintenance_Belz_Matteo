import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

// @ts-ignore
import readmePath from '../../../../README.md?raw';

const About = () => {
    const [markdown, setMarkdown] = useState('');

    useEffect(() => {
        setMarkdown(readmePath);
    }, []);

    return (
        <div className="about-container fade-in">
            <section className="about-header">
                <h1>A Propos</h1>
                <p>
                    Projet de maintenance et d'évolution d'une application de gestion de championnats.
                </p>
                <a
                    href="https://github.com/BELZ-MATTEO-2326017b/R6.A.06_Maintenance_Belz_Matteo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="github-link"
                >
                    Voir le Repository GitHub
                </a>
            </section>

            <section className="readme-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                    {markdown}
                </ReactMarkdown>
            </section>
        </div>
    );
};

export default About;
