<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization');
header('Content-Type: application/json; charset=UTF-8');

include "db_config.php"; // koneksi $pdo

$postjson = json_decode(file_get_contents('php://input'), true);
$aksi = isset($postjson['aksi']) ? strip_tags($postjson['aksi']) : null;

$data = array();

if (!$aksi) {
    echo json_encode(['success' => false, 'msg' => 'Aksi tidak dikirim']);
    exit;
}

switch ($aksi) {

    // ✅ LOGIN
    case "login":
        try {
            $username = $postjson['username'] ?? '';
            $password = md5($postjson['password'] ?? ''); // gunakan md5 hanya untuk lokal

            if (empty($username) || empty($password)) {
                echo json_encode(['success' => false, 'msg' => 'Username atau password kosong']);
                exit;
            }

            $query = $pdo->prepare("SELECT * FROM users WHERE username = :username AND password = :password LIMIT 1");
            $query->bindParam(':username', $username);
            $query->bindParam(':password', $password);
            $query->execute();

            $user = $query->fetch(PDO::FETCH_ASSOC);

            if ($user) {
                echo json_encode([
                    'success' => true,
                    'user' => [
                        'id' => $user['id'],
                        'username' => $user['username'],
                        'nama_lengkap' => $user['nama_lengkap'],
                        'role' => $user['role']
                    ]
                ]);
            } else {
                echo json_encode(['success' => false, 'msg' => 'Username atau password salah']);
            }
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'msg' => $e->getMessage()]);
        }
        break;

    // ✅ Tambah data peminjaman
    case "add_peminjaman":
        try {
            if (
                empty($postjson['nama']) || empty($postjson['email']) || empty($postjson['telepon']) ||
                empty($postjson['kategori']) || empty($postjson['judul']) ||
                empty($postjson['tanggalPinjam']) || empty($postjson['tanggalKembali'])
            ) {
                echo json_encode(['success' => false, 'msg' => 'Data belum lengkap']);
                exit;
            }

            $sql = "INSERT INTO peminjaman (nama, email, telepon, kategori, judul, tanggal_pinjam, tanggal_kembali, gambar)
                    VALUES (:nama, :email, :telepon, :kategori, :judul, :tanggal_pinjam, :tanggal_kembali, :gambar)";

            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':nama', $postjson['nama']);
            $stmt->bindParam(':email', $postjson['email']);
            $stmt->bindParam(':telepon', $postjson['telepon']);
            $stmt->bindParam(':kategori', $postjson['kategori']);
            $stmt->bindParam(':judul', $postjson['judul']);
            $stmt->bindParam(':tanggal_pinjam', $postjson['tanggalPinjam']);
            $stmt->bindParam(':tanggal_kembali', $postjson['tanggalKembali']);

            $gambar = $postjson['gambar'] ?? null;
            $stmt->bindParam(':gambar', $gambar);

            $stmt->execute();

            $lastId = $pdo->lastInsertId();

            echo json_encode(['success' => true, 'id' => $lastId]);

        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'msg' => $e->getMessage()]);
        }
        break;

    // ✅ Tampilkan data peminjaman
    case "get_peminjaman":
        try {
            $sql = "SELECT * FROM peminjaman ORDER BY id DESC";
            $stmt = $pdo->prepare($sql);
            $stmt->execute();

            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            foreach ($rows as $row) {
                $data[] = [
                    'id' => $row['id'],
                    'nama' => $row['nama'],
                    'email' => $row['email'],
                    'telepon' => $row['telepon'],
                    'kategori' => $row['kategori'],
                    'judul' => $row['judul'],
                    'tanggal_pinjam' => $row['tanggal_pinjam'],
                    'tanggal_kembali' => $row['tanggal_kembali'],
                    'gambar' => $row['gambar']
                ];
            }

            echo json_encode(['success' => true, 'result' => $data]);

        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'msg' => $e->getMessage()]);
        }
        break;

    // ✅ Hapus data peminjaman
    case "delete_peminjaman":
        try {
            if (empty($postjson['id'])) {
                echo json_encode(['success' => false, 'msg' => 'ID tidak diterima']);
                exit;
            }

            $sql = "DELETE FROM peminjaman WHERE id = :id";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':id', $postjson['id']);
            $stmt->execute();

            echo json_encode(['success' => true, 'msg' => 'Data berhasil dihapus']);

        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'msg' => $e->getMessage()]);
        }
        break;

    // ❌ Default jika aksi tidak ditemukan
    default:
        echo json_encode(['success' => false, 'msg' => 'Aksi tidak ditemukan']);
        break;
}
