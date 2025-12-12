export default function Home() {
  return (
    <main style={{ fontFamily: 'sans-serif', padding: 40, maxWidth: 480, margin: '0 auto' }}>
      <h1>Verifikasi Gemini Pro</h1>
      <p>Tempel link verifikasi SheerID & upload dokumen mahasiswa.</p>

      <form method="POST" action="/api/verify" encType="multipart/form-data">
        <label>Link Verifikasi:</label>
        <input
          name="link"
          placeholder="https://my.sheerid.com/...verificationId=xxxxx"
          style={{ width: '100%', padding: 10, marginTop: 5, borderRadius: 6, border: '1px solid #ccc' }}
        />

        <label style={{ marginTop: 20, display: 'block' }}>Upload Dokumen:</label>
        <input type="file" name="file" accept="image/*" />

        <button type="submit"
          style={{
            marginTop: 20,
            padding: '10px 20px',
            background: '#2563eb',
            color: 'white',
            borderRadius: 6,
            border: 'none'
          }}>
          Verifikasi
        </button>
      </form>
    </main>
  );
          }
