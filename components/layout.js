import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import { Container, Form, Row, Col, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react'; 
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import { ForgottenPassword } from '@supabase/auth-ui-react';

const supabase = createClient("https://qliwvolgeikzcypvtepy.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsaXd2b2xnZWlremN5cHZ0ZXB5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkwMzkxOTAsImV4cCI6MjAwNDYxNTE5MH0.Q_-TpI40U_q-6eWX6ziIb91IHfMvQNq1TUolTMmuxak")
const CDNURL = "https://qliwvolgeikzcypvtepy.supabase.co/storage/v1/object/public/videos/";

const name = 'Visionary';
export const siteTitle = 'Visionary';

export default function Layout({ children, home }) {
  
  const [videos, setVideos] = useState([]);
  const [shorts, setShorts] = useState([]);
  const [article, setArticles] = useState([]);


  async function getVideos() {
    const { data, error } = await supabase
      .storage
      .from('videos')
      .list('')

    if(data !== null) {
      setVideos(data);
    } else {
      console.log(error);
      alert("Error grabbing files from Supabase")
    }
  }

  async function getShorts() {
    const { data, error } = await supabase
      .storage
      .from('shorts')
      .list('')

    if(data !== null) {
      setShorts(data);
    } else {
      console.log(error);
      alert("Error grabbing files from Supabase")
    }
  }

  async function getArticles() {
    const { data, error } = await supabase
      .storage
      .from('articles')
      .list('')

    if(data !== null) {
      setArticles(data);
    } else {
      console.log(error);
      alert("Error grabbing files from Supabase")
    }
  }

  useEffect(() => {
    getVideos();
  }, []);

  
  async function uploadFile(e) {
    const videoFile = e.target.files[0];
    console.log("Upload!");
    const { error } = await supabase.storage
      .from('videos')
      .upload(uuidv4() + ".mp4", videoFile)
    if(error){
      console.log(error);
      alert("Error uploading file to Supabase");
    }
  }

  console.log(videos)

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/images/tabicon.webp" />
        <meta
          name="description"
          content="Upload personal creative content for others to enjoy!"
        />
      </Head>

      <header className={styles.header}>
        {home ? (
          <>
            <Link href="/">
            <Image
              priority
              className={utilStyles.navbarImages}
              src="/images/dmedia2.png"
              height={37}
              width={37}
              alt=""
            />
            </Link>

            <h1 className={utilStyles.heading2Xl}>{name}</h1>
            
            <Link href="/" style={{ textDecoration: 'none' }}>
              <h1 className={utilStyles.headingR}>Home</h1>
            </Link>
            <Link href="/posts/about" style={{ textDecoration: 'none' }}>
              <h1 className={utilStyles.headingR}>About</h1>
            </Link>
            <Link href="/post/help"style={{ textDecoration: 'none' }}>
              <h1 className={utilStyles.headingR}>Help</h1>
            </Link>
            <Link href="../app/signin" style={{ textDecoration: 'none' }}>
            <Image
              priority
              className={utilStyles.account}
              src="/images/user.png"
              height={24}
              width={24}
              alt=""
            />
            </Link>
          </>
        ) : (
          <>
            <Link href="/posts/account">
              <Image
                priority
                src="/images/user.png"
                className={utilStyles.borderCircle}
                height={38}
                width={38}
                alt=""
              />
            </Link>
            <div className={utilStyles.headingLg}>
              <Link href="/" className={utilStyles.colorInherit}>
                {name}
              </Link>
            </div>
          </>
        )}
      </header>
      
      <main className={styles.main}>
        <Link href="post/videos" style={{ textDecoration: 'none' }}>
          <Image
            priority
            src="/images/videos.png"
            className={utilStyles.verticalImages}
            height={38}
            width={38}
            alt=""
          />
          <h1 className={utilStyles.verticalBar}>Videos</h1>
        </Link>
        <Link href="post/shorts" style={{ textDecoration: 'none' }}>
          <Image
            priority
            src="/images/shorts.png"
            className={utilStyles.verticalImages}
            height={38}
            width={38}
            alt=""
          />
          <div className={utilStyles.verticalBar}>Shorts</div>
        </Link>
        <Link href="post/articles" style={{ textDecoration: 'none' }}>
          <Image
            priority
            src="/images/article.png"
            className={utilStyles.verticalImages}
            height={38}
            width={38}
            alt=""
          />
          <div className={utilStyles.verticalBar}>Articles</div>
        </Link>
      </main>

      <main className={utilStyles.content}>
        <ul className={utilStyles.contentText}>
          <Container className={utilStyles.contentBox}>
            <li>Videos</li>
            <Form.Group className="filestyle">
              <Form.Label>Upload</Form.Label>
              <Form.Control type='file' accept='video/mp4' onChange={(e) => uploadFile(e)}/>
            </Form.Group>

            <Row xs={10} className='videoformat'>
              {
                videos.map((videos) => {
                  console.log(videos);
                  return (
                    <Col>
                      <Card>
                        <video height="380px" width="720" controls>
                          <source src={CDNURL + videos.name} type="video/mp4" />
                        </video>
                      </Card>
                    </Col>
                  )
                })
              }
            </Row>
          </Container>
          <Container className={utilStyles.contentBox}>
            <li>Shorts</li>
            <Form.Group className="filestyle">
              <Form.Label>Upload</Form.Label>
              <Form.Control type='file' accept='video/mp4' onChange={(e) => uploadFile}/>
            </Form.Group>
          </Container>
          <Container className={utilStyles.contentBox}>
            <li>Articles</li>
            <Form.Group className="filestyle">
              <Form.Label>Upload</Form.Label>
              <Form.Control type='file' accept='txt' onChange={(e) => uploadFile}/>
            </Form.Group>
          </Container>
        </ul>
      </main>

      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      )}
    </div>
  );
}