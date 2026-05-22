import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, Filter, Download, Users, UserCheck, UserX, 
  Clock, BookOpen, Activity, ChevronLeft, ChevronRight, LayoutDashboard, Table as TableIcon
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

// --- MOCK DATA (Berdasarkan gambar Spreadsheet) ---
const mockData = [
  { id: 156, tanggal: '2026-01-13', waktu: '11:43:07', kegiatan: 'Literasi', kelas: '7C', nis: '250089', nama: 'ZAFIRA LAIQA ARIF', jk: 'P', agama: 'Islam', status: 'Tidak Hadir', keterangan: '-', petugas: 'Nur alfiah' },
  { id: 157, tanggal: '2026-01-13', waktu: '11:43:07', kegiatan: 'Kehadiran', kelas: '7C', nis: '250089', nama: 'ZAFIRA LAIQA ARIF', jk: 'P', agama: 'Islam', status: 'Tidak Hadir', keterangan: '-', petugas: 'Nur alfiah' },
  { id: 158, tanggal: '2026-01-13', waktu: '11:43:07', kegiatan: 'Shalat Dhuha', kelas: '7C', nis: '250089', nama: 'ZAFIRA LAIQA ARIF', jk: 'P', agama: 'Islam', status: 'Tidak Hadir', keterangan: '-', petugas: 'Nur alfiah' },
  { id: 160, tanggal: '2026-01-13', waktu: '11:43:03', kegiatan: 'Literasi', kelas: '7C', nis: '250088', nama: 'YAZER ARAFAH', jk: 'L', agama: 'Islam', status: 'Tidak Hadir', keterangan: '-', petugas: 'Nur alfiah' },
  { id: 161, tanggal: '2026-01-13', waktu: '11:43:03', kegiatan: 'Kehadiran', kelas: '7C', nis: '250088', nama: 'YAZER ARAFAH', jk: 'L', agama: 'Islam', status: 'Tidak Hadir', keterangan: '-', petugas: 'Nur alfiah' },
  { id: 164, tanggal: '2026-01-13', waktu: '11:42:53', kegiatan: 'Literasi', kelas: '7C', nis: '250086', nama: 'RANDIANSYAH', jk: 'L', agama: 'Islam', status: 'Tidak Hadir', keterangan: '-', petugas: 'Nur alfiah' },
  { id: 168, tanggal: '2026-01-13', waktu: '11:42:33', kegiatan: 'Literasi', kelas: '7C', nis: '250084', nama: 'NURUL ISMI', jk: 'P', agama: 'Islam', status: 'Izin', keterangan: 'Terlambat bangun', petugas: 'Nur alfiah' },
  { id: 169, tanggal: '2026-01-13', waktu: '11:42:33', kegiatan: 'Kehadiran', kelas: '7C', nis: '250084', nama: 'NURUL ISMI', jk: 'P', agama: 'Islam', status: 'Izin', keterangan: 'Terlambat bangun', petugas: 'Nur alfiah' },
  { id: 172, tanggal: '2026-01-13', waktu: '11:41:17', kegiatan: 'Kehadiran', kelas: '7C', nis: '250062', nama: 'AINA TALITA ZAHRAA', jk: 'P', agama: 'Islam', status: 'Hadir', keterangan: '-', petugas: 'Nur alfiah' },
  { id: 173, tanggal: '2026-01-13', waktu: '11:40:33', kegiatan: 'Kehadiran', kelas: '7A', nis: '250013', nama: 'FADHLUR ROHMAN DZAKIR', jk: 'L', agama: 'Islam', status: 'Hadir', keterangan: '-', petugas: 'Nur alfiah' },
  { id: 174, tanggal: '2026-01-13', waktu: '11:39:30', kegiatan: 'Kehadiran', kelas: '7A', nis: '250004', nama: 'ADVENT NIKOL GIBRAN PUTRA', jk: 'L', agama: 'Katholik', status: 'Hadir', keterangan: '-', petugas: 'Nur alfiah' },
  { id: 175, tanggal: '2026-01-13', waktu: '11:35:59', kegiatan: 'Kehadiran', kelas: '8A', nis: '240012', nama: 'MUHAMMAD MIFTAHUL KHAIR', jk: 'L', agama: 'Islam', status: 'Tidak Hadir', keterangan: '-', petugas: 'Nur alfiah' },
  { id: 179, tanggal: '2026-01-13', waktu: '10:54:59', kegiatan: 'Literasi', kelas: '9A', nis: '230015', nama: 'MUH. GHAZY ALGIFARI', jk: 'L', agama: 'Islam', status: 'Tidak Literasi', keterangan: '-', petugas: 'Putri Nurul Amalia' },
  { id: 180, tanggal: '2026-01-13', waktu: '10:54:54', kegiatan: 'Literasi', kelas: '9A', nis: '230004', nama: 'HUSNAH AMAINAH PUTRI', jk: 'P', agama: 'Islam', status: 'Literasi', keterangan: '-', petugas: 'Putri Nurul Amalia' },
  { id: 182, tanggal: '2026-01-13', waktu: '10:53:49', kegiatan: 'Kehadiran', kelas: '9B', nis: '230036', nama: 'MUHAMMAD SALDI', jk: 'L', agama: 'Islam', status: 'Tidak Hadir', keterangan: '-', petugas: 'Putri Nurul Amalia' },
  { id: 186, tanggal: '2026-01-13', waktu: '10:53:46', kegiatan: 'Literasi', kelas: '9B', nis: '230037', nama: 'MUHAMMAD NUH HANNAN', jk: 'L', agama: 'Islam', status: 'Literasi', keterangan: '-', petugas: 'Putri Nurul Amalia' },
];

// Konfigurasi warna untuk berbagai jenis status secara dinamis
const STATUS_COLORS = {
  'Hadir': '#10b981',         // hijau
  'Tidak Hadir': '#ef4444',   // merah
  'Izin': '#eab308',          // kuning
  'Sakit': '#f97316',         // oranye
  'Literasi': '#3b82f6',      // biru
  'Tidak Literasi': '#f43f5e',// merah muda gelap
};
const DEFAULT_COLOR = '#94a3b8'; // abu-abu untuk status yang tidak terdaftar

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [filterKelas, setFilterKelas] = useState('');
  const [filterKegiatan, setFilterKegiatan] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterTanggalMulai, setFilterTanggalMulai] = useState('');
  const [filterTanggalAkhir, setFilterTanggalAkhir] = useState('');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbw01j6kT-V9vofk42Ms5WuJThtDuEmtRtjinA2QO6wIVOvg6nCyimURzgnpDf0Z3xm9hA/exec'; 
    
    if (scriptUrl.includes('AKfycb...')) {
      console.log("Menggunakan mockData (URL belum diatur).");
      setTimeout(() => {
        setData(mockData);
        setLoading(false);
      }, 500);
      return;
    }

    fetch(scriptUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Gagal mengambil data, beralih ke data simulasi:", error);
        setData(mockData);
        setLoading(false);
      });
  }, []);

  const uniqueKelas = [...new Set(data.map(item => String(item.kelas || '')))].filter(Boolean).sort();
  const uniqueKegiatan = [...new Set(data.map(item => String(item.kegiatan || '')))].filter(Boolean).sort();
  const uniqueStatus = [...new Set(data.map(item => String(item.status || '')))].filter(Boolean).sort();

  // Logika Penyaringan Data
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const safeNama = String(item.nama || '').toLowerCase();
      const safeNis = String(item.nis || '');
      const searchLower = searchTerm.toLowerCase();

      const matchSearch = safeNama.includes(searchLower) || safeNis.includes(searchLower);
      const matchKelas = filterKelas ? String(item.kelas) === filterKelas : true;
      const matchKegiatan = filterKegiatan ? String(item.kegiatan) === filterKegiatan : true;
      const matchStatus = filterStatus ? String(item.status) === filterStatus : true;
      
      // Perbaikan filter tanggal & rentang tanggal
      let matchTanggal = true;
      // Mengambil 10 karakter pertama saja (YYYY-MM-DD) untuk mengabaikan jam/zona waktu jika ada
      const itemTanggalStr = String(item.tanggal || '').substring(0, 10); 
      
      if (filterTanggalMulai && itemTanggalStr < filterTanggalMulai) {
        matchTanggal = false;
      }
      if (filterTanggalAkhir && itemTanggalStr > filterTanggalAkhir) {
        matchTanggal = false;
      }
      
      return matchSearch && matchKelas && matchKegiatan && matchStatus && matchTanggal;
    });
  }, [data, searchTerm, filterKelas, filterKegiatan, filterStatus, filterTanggalMulai, filterTanggalAkhir]);

  // Statistik untuk Dashboard (Kini menangkap semua status)
  const stats = useMemo(() => {
    let hadirPositif = 0;
    let tidakHadirNegatif = 0;
    let izinSakit = 0;

    filteredData.forEach(d => {
      const s = String(d.status || '');
      // Deteksi dinamis berdasarkan kata kunci
      if (s.includes('Tidak')) {
        tidakHadirNegatif++;
      } else if (s === 'Izin' || s === 'Sakit') {
        izinSakit++;
      } else if (s) {
        // Asumsi nilai selain di atas (seperti Hadir, Literasi) adalah kegiatan tercapai/positif
        hadirPositif++;
      }
    });
    
    return {
      total: filteredData.length,
      hadirPositif,
      tidakHadirNegatif,
      izinSakit,
    };
  }, [filteredData]);

  // Data untuk Grafik Pie (Dinamis berdasarkan semua status unik di data yang difilter)
  const pieData = useMemo(() => {
    const counts = {};
    filteredData.forEach(item => {
      const s = String(item.status || 'Tidak Diketahui');
      counts[s] = (counts[s] || 0) + 1;
    });
    
    return Object.keys(counts).map(key => ({
      name: key,
      value: counts[key],
      color: STATUS_COLORS[key] || DEFAULT_COLOR
    }));
  }, [filteredData]);

  // Data untuk Grafik Bar (Berdasarkan Kelas & Semua Status Secara Dinamis)
  const barData = useMemo(() => {
    const kelasMap = {};
    filteredData.forEach(item => {
      const kelasString = String(item.kelas || 'Tidak Diketahui');
      if (!kelasMap[kelasString]) {
        kelasMap[kelasString] = { kelas: kelasString };
        // Inisialisasi 0 untuk semua status agar bentuk stack/tooltip rapi
        uniqueStatus.forEach(s => { kelasMap[kelasString][s] = 0; });
      }
      
      const statusString = String(item.status || '');
      if (statusString) {
        kelasMap[kelasString][statusString] += 1;
      }
    });
    return Object.values(kelasMap).sort((a, b) => a.kelas.localeCompare(b.kelas));
  }, [filteredData, uniqueStatus]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Fungsi Export CSV
  const handleExport = () => {
    const headers = ['No', 'Tanggal', 'Waktu', 'Kegiatan', 'Kelas', 'NIS', 'Nama Siswa', 'JK', 'Agama', 'Status', 'Keterangan', 'Petugas'];
    const csvContent = [
      headers.join(','),
      ...filteredData.map(row => 
        [row.id, row.tanggal, row.waktu, row.kegiatan, row.kelas, row.nis, `"${row.nama || ''}"`, row.jk, row.agama, row.status, `"${row.keterangan || ''}"`, `"${row.petugas || ''}"`].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `laporan_presensi_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper untuk warna badge status
  const getStatusBadge = (status) => {
    const safeStatus = String(status || '');
    if (safeStatus.includes('Tidak')) return 'bg-red-100 text-red-800 border-red-200';
    if (safeStatus === 'Izin' || safeStatus === 'Sakit') return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-green-100 text-green-800 border-green-200'; 
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <Activity className="h-12 w-12 animate-spin text-blue-600 mb-4" />
          <p className="text-gray-600 font-medium">Memuat Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Header/Navbar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Sistem Presensi Siswa</h1>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <LayoutDashboard size={16} /> Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('table')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'table' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <TableIcon size={16} /> Data Tabel
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* Filter Section (Universal) */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-medium text-gray-500 mb-1">Cari Siswa</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Nama atau NIS..."
                className="pl-10 block w-full rounded-md border-gray-300 border py-2 px-3 text-sm focus:border-blue-500 focus:ring-blue-500 outline-none transition-all"
                value={searchTerm}
                onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}}
              />
            </div>
          </div>
          
          <div className="w-full sm:w-auto">
            <label className="block text-xs font-medium text-gray-500 mb-1">Dari Tanggal</label>
            <input 
              type="date"
              className="block w-full rounded-md border-gray-300 border py-2 px-3 text-sm focus:border-blue-500 focus:ring-blue-500 outline-none"
              value={filterTanggalMulai}
              onChange={(e) => {setFilterTanggalMulai(e.target.value); setCurrentPage(1);}}
            />
          </div>

          <div className="w-full sm:w-auto">
            <label className="block text-xs font-medium text-gray-500 mb-1">Sampai Tanggal</label>
            <input 
              type="date"
              className="block w-full rounded-md border-gray-300 border py-2 px-3 text-sm focus:border-blue-500 focus:ring-blue-500 outline-none"
              value={filterTanggalAkhir}
              onChange={(e) => {setFilterTanggalAkhir(e.target.value); setCurrentPage(1);}}
            />
          </div>

          <div className="w-full sm:w-auto">
            <label className="block text-xs font-medium text-gray-500 mb-1">Kelas</label>
            <select 
              className="block w-full rounded-md border-gray-300 border py-2 px-3 text-sm focus:border-blue-500 focus:ring-blue-500 outline-none"
              value={filterKelas}
              onChange={(e) => {setFilterKelas(e.target.value); setCurrentPage(1);}}
            >
              <option value="">Semua Kelas</option>
              {uniqueKelas.map(k => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>

          <div className="w-full sm:w-48">
            <label className="block text-xs font-medium text-gray-500 mb-1">Kegiatan</label>
            <select 
              className="block w-full rounded-md border-gray-300 border py-2 px-3 text-sm focus:border-blue-500 focus:ring-blue-500 outline-none"
              value={filterKegiatan}
              onChange={(e) => {setFilterKegiatan(e.target.value); setCurrentPage(1);}}
            >
              <option value="">Semua Kegiatan</option>
              {uniqueKegiatan.map(k => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>

          <div className="w-full sm:w-40">
            <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
            <select 
              className="block w-full rounded-md border-gray-300 border py-2 px-3 text-sm focus:border-blue-500 focus:ring-blue-500 outline-none"
              value={filterStatus}
              onChange={(e) => {setFilterStatus(e.target.value); setCurrentPage(1);}}
            >
              <option value="">Semua Status</option>
              {uniqueStatus.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <button 
            onClick={handleExport}
            className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Download size={16} /> Ekspor CSV
          </button>
        </div>

        {activeTab === 'dashboard' ? (
          /* --- DASHBOARD VIEW --- */
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                  <Users size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Keseluruhan Data</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
                <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                  <UserCheck size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Hadir / Literasi</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.hadirPositif}</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
                <div className="p-3 bg-red-100 text-red-600 rounded-lg">
                  <UserX size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Tidak Hadir / Absen</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.tidakHadirNegatif}</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
                <div className="p-3 bg-yellow-100 text-yellow-600 rounded-lg">
                  <Clock size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Izin / Sakit</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.izinSakit}</p>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 lg:col-span-2">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Statistik Status per Kelas</h3>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <XAxis dataKey="kelas" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <RechartsTooltip cursor={{fill: '#f3f4f6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}/>
                      <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}}/>
                      {/* Render Bar secara dinamis berdasarkan status yang tersedia */}
                      {uniqueStatus.map(status => (
                        <Bar 
                          key={status} 
                          dataKey={status} 
                          stackId="a" 
                          fill={STATUS_COLORS[status] || DEFAULT_COLOR} 
                        />
                      ))}
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Persentase Seluruh Status</h3>
                <div className="h-72 w-full flex items-center justify-center">
                  {pieData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <RechartsTooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}/>
                        <Legend iconType="circle" verticalAlign="bottom"/>
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <p className="text-gray-400 text-sm">Tidak ada data untuk ditampilkan</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* --- TABLE VIEW --- */
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Waktu</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Siswa</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Kelas</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Kegiatan</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Keterangan</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Petugas</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedData.length > 0 ? (
                    paginatedData.map((row) => (
                      <tr key={`${row.id}-${row.kegiatan}`} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="font-medium text-gray-900">{row.waktu}</div>
                          <div className="text-xs">{row.tanggal}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{row.nama}</div>
                          <div className="text-xs text-gray-500">NIS: {row.nis} • {row.jk} • {row.agama}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {row.kelas}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {row.kegiatan}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadge(row.status)}`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-[200px] truncate" title={row.keterangan}>
                          {row.keterangan}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {row.petugas}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-10 text-center text-gray-500">
                        <div className="flex flex-col items-center justify-center">
                          <Filter className="h-10 w-10 text-gray-300 mb-2" />
                          <p>Tidak ada data yang sesuai dengan filter pencarian.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="bg-white px-4 py-3 border-t border-gray-200 flex items-center justify-between sm:px-6">
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Menampilkan <span className="font-medium">{((currentPage - 1) * itemsPerPage) + 1}</span> hingga <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredData.length)}</span> dari <span className="font-medium">{filteredData.length}</span> hasil
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="sr-only">Previous</span>
                        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                      </button>
                      <div className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                        Halaman {currentPage} dari {totalPages}
                      </div>
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="sr-only">Next</span>
                        <ChevronRight className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}