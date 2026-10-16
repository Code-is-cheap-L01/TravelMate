# TravelMate: Hệ Thống Điều Hành Du Lịch Nhóm Liền Mạch

> **Môn học:** Phát triển Ứng dụng Thiết bị Di động (Mobile Application Development)  
> **Nhóm thực hiện:** Code is cheap  
> **Định vị sản phẩm:** Nền tảng điều hành chuyến đi thời gian thực, hàn gắn sự đứt gãy thông tin giữa **Lịch trình**, **Ngữ cảnh thực địa** và **Quyết toán chi phí** trong một chu trình khép kín duy nhất (All-in-one Contextual Loop).

---

## 1. Bối Cảnh Thực Địa & Chân Dung Người Dùng (Target Audience & Context)

### 1.1. Chân dung đối tượng trọng tâm (Target Persona)
* **Quy mô nhóm:** Nhóm bạn trẻ, học sinh, sinh viên hoặc đồng nghiệp trẻ từ **3 đến 8 người**.
* **Đặc điểm hành vi:**
  * Thích du lịch tự túc, linh hoạt, ngắn ngày (2–4 ngày cuối tuần như Vũng Tàu, Đà Lạt, Phan Thiết...).
  * Thường chỉ có 1–2 người đóng vai trò "Trưởng đoàn" (lên kế hoạch, giữ quỹ hoặc ứng tiền trước), các thành viên còn lại thụ hưởng thông tin thụ động.
  * Ngân sách có hạn, ưu tiên tính công bằng, minh bạch nhưng tâm lý rất ngại việc nhắc nợ, đòi nợ trực tiếp sau chuyến đi.

### 1.2. Bối cảnh sử dụng khắc nghiệt (Field Context & Physical Ergonomics)
Khác với ứng dụng văn phòng hoặc mạng xã hội được dùng khi ngồi yên tĩnh, TravelMate được thiết kế chuyên biệt cho bối cảnh thực địa di động:
* **Môi trường vật lý:** Người dùng đang di chuyển liên tục ngoài đường, ngồi sau xe máy, cầm lái, hoặc tay xách ba lô, hành lý cồng kềnh dưới trời nắng gắt.
* **Mạng viễn thông thiếu ổn định:** Kết nối 4G/5G chập chờn khi đi qua đèo dốc, vùng sâu vùng xa, tầng hầm hoặc các điểm du lịch ngoại thành.
* **Giới hạn thao tác (The 10–15s Micro-interaction Window):** 
  * Tại mỗi điểm dừng (đèn đỏ, trạm xăng, quán ăn), người dùng chỉ có thể mở điện thoại trong khoảng **10 đến 15 giây** bằng một tay để kiểm tra địa điểm tiếp theo hoặc lưu lại khoản tiền vừa chi.
  * Mọi luồng tương tác phức tạp (quá nhiều bước nhập liệu, form biểu mẫu dài dòng) đều dẫn đến tỷ lệ bỏ dở tác vụ (drop-off rate) cực kỳ cao.

---

## 2. Bản Chất Vấn Đề & Phân Tích Nút Thắt Dữ Liệu

### 2.1. Thực trạng: Quy trình bị "xé vụn" qua 3 công cụ độc lập
Hiện nay, các nhóm du lịch tự túc phải duy trì song song 3 ứng dụng không kết nối:

```
[Nhóm Chat (Zalo/Messenger)]  <--- Con người copy/paste thủ công --->  [Bản Đồ (Google Maps)]
            ^                                                                  ^
            |                  Con người đối chiếu thủ công                     |
            +---------------------> [App Chia Tiền (Splitwise/Excel)] <--------+
```

1. **Ứng dụng Chat (Messenger / Zalo / Telegram):**
   * *Mục đích:* Nơi bàn bạc, biểu quyết, gửi link quán ăn.
   * *Nút thắt:* Tin nhắn trôi cực nhanh; ghim bài thì không cập nhật được trạng thái thời gian thực; xảy ra hiện tượng "loạn phiên bản lịch trình".
2. **Ứng dụng Điều Hướng (Google Maps / Apple Maps):**
   * *Mục đích:* Lưu điểm ghim (pinned places), dẫn đường.
   * *Nút thắt:* Tách rời hoàn toàn khỏi mốc thời gian và ngân sách; mỗi người dùng phải tự gõ lại tên quán để tra đường thủ công.
3. **Ứng dụng Tính Tiền (Splitwise / Google Sheets / Ghi chú):**
   * *Mục đích:* Ghi chép thu chi, chia tiền nhóm.
   * *Nút thắt:* Bắt buộc nhập liệu thủ công hoàn toàn từ đầu (tên khoản chi, địa điểm, số tiền, ai tham gia). Không có liên kết ngữ cảnh với nơi vừa ghé thăm.

### 2.2. Hậu quả thực tế trong chuyến đi
* **Hội chứng "Bây giờ đi đâu tiếp?":** Cả nhóm liên tục hỏi người dẫn đoàn, gây áp lực và mệt mỏi cho người tổ chức.
* **Tâm lý ngại ghi chép dẫn đến thất thoát quỹ:** Đang ăn uống hoặc di chuyển vội vã khiến người trả tiền tặc lưỡi "về khách sạn rồi ghi sau". Đến tối hoặc cuối chuyến, các hóa đơn nhỏ (tiền gửi xe, nước mía, vé cầu đường) bị lãng quên hoàn toàn.
* **Bất tiện khi đối chiếu nợ chéo (Debt Settlement Friction):** Cuối chuyến, nhóm phải mất hàng giờ ngồi tính toán ai nợ ai, dẫn đến tranh cãi hoặc ngại ngùng vì những khoản chi mập mờ.

---

## 3. Lợi Thế Độc Bản Của Nền Tảng Di Động (Mobile-Native Advantages)

TravelMate không đơn thuần là phiên bản thu nhỏ của một trang web, mà tận dụng tối đa các cảm biến phần cứng và năng lực cốt lõi của hệ điều hành di động:

* **GPS & Ngữ cảnh vị trí (Geofencing & Location Awareness):**
  * Tự động phát hiện khi nhóm đã đến hoặc rời khỏi tọa độ của một điểm hẹn.
  * Tự động đưa hoạt động tiếp theo (**Next Activity**) lên tâm điểm giao diện mà không cần người dùng thao tác vuốt tìm.
* **Tương tác chạm một bước (One-Tap Interaction under 10s):**
  * Tận dụng cử chỉ (gestures) và thông báo tương tác nhanh: Chỉ 1 chạm xác nhận "Đã đến" hoặc "Rời điểm", hệ thống lập tức mở popup điền sẵn tên quán ăn và danh sách thành viên hiện diện.
* **Đẩy thông báo thời gian thực (Reactive Push Notifications):**
  * Báo thức đồng bộ trước giờ xuất phát 15 phút.
  * Cảnh báo nguy cơ trễ tiến độ dựa trên khoảng cách di chuyển thực tế.
  * Gửi broadcast tức thì khi có sự thay đổi đột xuất trong lịch trình (ví dụ: đổi quán ăn do hết bàn).
* **Kiến trúc ngoại tuyến (Offline-First Architecture):**
  * Hỗ trợ lưu trữ cục bộ (Local Cache) cho phép truy cập toàn bộ lộ trình và ghi nhận chi phí ngay cả khi mất sóng giữa đèo. Hệ thống sẽ tự động đồng bộ ngầm khi thiết bị tái kết nối Internet.

---

## 4. Ma Trận So Sánh Điểm Khác Biệt Cốt Lõi

| Tiêu chí phân tích | Phương pháp truyền thống (Chat + Maps + Splitwise) | TravelMate (Chuỗi ngữ cảnh liền mạch) |
| :--- | :--- | :--- |
| **Độ gắn kết dữ liệu (Data Cohesion)** | **Rời rạc:** 3 cơ sở dữ liệu riêng lẻ. Con người đóng vai trò là "cầu nối dữ liệu chạy bằng cơm" giữa các app. | **Đồng nhất:** Lịch trình $\rightarrow$ Địa điểm $\rightarrow$ Chi phí $\rightarrow$ Người thụ hưởng được liên kết chặt chẽ trong cùng một thực thể dữ liệu (Data Entity). |
| **Trải nghiệm nhập liệu (Input UX)** | **Gõ lặp lại nhiều lần:** Bàn trên chat $\rightarrow$ mở Maps gõ tên quán tìm đường $\rightarrow$ mở Splitwise gõ lại tên quán, giá tiền và tick từng thành viên. | **Nhập liệu ngữ cảnh 1 chạm:** Rời điểm dừng, hệ thống tự điền sẵn tên địa điểm, thời gian và tự động mặc định chọn tất cả thành viên có mặt. |
| **Nguồn chân lý (Single Source of Truth)** | **Xung đột thông tin:** Mỗi người cầm một thông tin khác nhau (tin nhắn cũ chưa đọc, ghim trên Maps cá nhân). Dễ gây cãi vã. | **Màn hình đồng bộ duy nhất:** Toàn bộ thành viên cùng truy cập vào một dòng thời gian trực tiếp, cập nhật theo thời gian thực (Real-time Timeline). |
| **Tốc độ quyết toán nợ (Settlement Speed)** | Mất hàng giờ cuối chuyến để dò hóa đơn, tính toán chuyển khoản chéo qua lại nhiều lần. | Thuật toán tự động bù trừ ròng; xuất biểu đồ thanh toán tối giản chỉ với một số ít giao dịch cuối chuyến. |

---

## 5. Quy Trình Vận Hành 4 Bước Khép Kín (The 4-Step Operational Loop)

```
+-----------------------------------------------------------------------------------+
|                           QUY TRÌNH 4 BƯỚC KHÉP KÍN                              |
+--------------------+---------------------+--------------------+-------------------+
| 1. LẬP LỊCH TRÌNH  | 2. LIVE TRIP MODE   | 3. GHI CHI PHÍ TẠI | 4. QUYẾT TOÁN     |
|    CỘNG TÁC        |    (IN-TRIP)        |    CHỖ (ON-SITE)   |    TỐI ƯU CÔNG NỢ |
|                    |                     |                    |                   |
| - Kéo/thả timeline | - Nhận diện GPS     | - Popup tức thì    | - Bù trừ công nợ  |
| - Đồng bộ tức thời | - Hiển thị Next Stop| - Prefill tên quán | - Giảm số giao    |
| - Biểu quyết điểm  | - Điều hướng 1 chạm | - Phân bổ thành    |   dịch tối đa     |
|   đến nhanh chóng  |   qua Google Maps   |   viên mặc định    | - Xuất mã QR Pay  |
+--------------------+---------------------+--------------------+-------------------+
```

### Bước 1: Lập Lịch Trình Nhóm Cộng Tác (Collaborative Pre-Trip Planning)
* Cho phép cả nhóm cùng tạo và kéo-thả sắp xếp các chặng dừng trên một trục thời gian chung.
* Cơ chế cập nhật thời gian thực (WebSockets/Real-time DB) giúp các thành viên thấy ngay thay đổi mà không cần tải lại ứng dụng.
* Tích hợp ước lượng khoảng cách và thời gian di chuyển giữa các điểm liên tiếp.

### Bước 2: Dẫn Dắt Thông Minh (In-Trip / Live Trip Mode)
* Màn hình chính tự động chuyển sang chế độ tinh gọn khi chuyến đi bắt đầu:
  * **Card chặng kế tiếp (Next Stop):** Hiển thị rõ tên điểm đến, thời gian dự kiến đến, khoảng cách còn lại.
  * **Phím tắt điều hướng 1-chạm:** Bấm nút lập tức mở trực tiếp ứng dụng Google Maps với tọa độ đích đã được gán sẵn, không cần tìm kiếm lại.

### Bước 3: Ghi Nhận Chi Phí Theo Ngữ Cảnh (Contextual On-Site Expense Logging)
* Khi người dùng bấm hoàn thành chặng hoặc rời khỏi geofence của điểm đến, ứng dụng kích hoạt một Bottom Sheet/Popup nhanh:
  * Trường "Tên khoản chi" tự động điền sẵn tên địa điểm (ví dụ: *Cơm niêu Thuận Kiều*).
  * Danh sách "Người cùng chia" tự động chọn mặc định toàn bộ thành viên trong nhóm (có thể bỏ chọn nhanh bằng 1 chạm nếu có ai vắng mặt).
  * Người thanh toán chỉ cần nhập đúng số tiền hiển thị trên bill và nhấn Lưu ($\le 10$ giây).

### Bước 4: Quyết Toán Tối Ưu Nợ (Debt Minimization & Smart Settlement)
* Thay vì mỗi người chuyển tiền qua lại cho từng bữa ăn gây ra ma trận chuyển khoản phức tạp, TravelMate áp dụng thuật toán tối ưu hóa luồng công nợ (Min-Cost Flow / Greedy Debt Settlement):
  * Tính số dư ròng (Net Balance) của mỗi thành viên:
    $$\text{Net Balance}_i = \text{Tổng tiền đã chi}_i - \text{Tổng tiền thụ hưởng}_i$$
  * Tự động ghép cặp người âm nhiều nhất trả cho người dương nhiều nhất, triệt tiêu nợ chéo.
  * Tích hợp mã VietQR động chứa sẵn số tiền và nội dung chuyển khoản để thanh toán dứt điểm trong vài giây.

---

## 6. Phạm Vi Sản Phẩm MVP Trong Giới Hạn Môn Học

Để đảm bảo tính khả thi cao trong thời gian triển khai 1 học kỳ, nhóm tập trung toàn lực vào 3 mô-đun cốt lõi:

```
+-----------------------------------------------------------------------+
|                       KIẾN TRÚC PHẠM VI MVP                          |
+-----------------------------------------------------------------------+
|  [Module 1: Lịch Trình]    [Module 2: Live Trip]  [Module 3: Quỹ & Chi]|
|  - Real-time Timeline       - Focus Card (Next)    - Ghi chi phí nhanh |
|  - Thêm/Sửa/Kéo-thả         - 1-Tap Google Maps    - Split bill nhóm   |
|  - Mời bạn qua link/QR      - Trạng thái chặng     - Bù trừ nợ ròng    |
+-----------------------------------------------------------------------+
|            NỀN TẢNG KỸ THUẬT: Offline Cache + Local Storage           |
+-----------------------------------------------------------------------+
```

1. **Mô-đun 1: Lịch Trình Cộng Tác (Collaborative Itinerary Engine)**
   * Tạo chuyến đi, mời thành viên tham gia thông qua Deep Link hoặc mã QR.
   * Lập danh sách hoạt động theo từng ngày (Day 1, Day 2...), hỗ trợ kéo thả đổi thứ tự.
   * Đồng bộ dữ liệu lập tức giữa các máy thông qua backend thời gian thực.
2. **Mô-đun 2: Màn Hình Live Trip Mode**
   * Giao diện tối giản dành riêng cho người đang di chuyển ngoài đường.
   * Hiển thị điểm đến hiện tại, điểm đến kế tiếp và thời gian dự kiến.
   * Nút bấm tích hợp gọi Deep Link mở Google Maps để dẫn đường ngay tức khắc.
3. **Mô-đun 3: Chi Tiêu Gắn Ngữ Cảnh & Quyết Toán (Contextual Expense & Settlement)**
   * Ghi hóa đơn gắn liền với ID của hoạt động trong lịch trình.
   * Tự động chia đều cho nhóm hoặc tùy biến người tham gia.
   * Bảng tổng hợp công nợ cuối chuyến, hiển thị danh sách giao dịch tối thiểu cần thực hiện kèm nút tạo mã QR ngân hàng.

---

## 7. Lộ Trình Mở Rộng Tính Năng (Post-MVP Roadmap)

Sau khi hoàn thành và kiểm chứng thành công vòng lặp cốt lõi của MVP, TravelMate sẽ tiếp tục tích hợp các tính năng mở rộng nhằm nâng cao trải nghiệm toàn diện:

### 7.1. Tích Hợp Dự Báo Thời Tiết Thời Gian Thực (Weather Integration)
* **Cơ chế:** Kết nối API thời tiết (OpenWeatherMap / AccuWeather) theo tọa độ GPS và thời gian của từng chặng trong lịch trình.
* **Tính năng:**
  * Cảnh báo thời tiết cực đoan (mưa dông, áp thấp, nắng gắt trên $38^\circ\text{C}$) trước khi xuất phát 2 giờ.
  * Tự động gợi ý hoán đổi lịch trình (ví dụ: trời mưa thì đẩy hoạt động trong nhà như quán cafe/bảo tàng lên trước).

### 7.2. Bảng Kiểm Chuẩn Bị Đồ Dùng (Collaborative Packing Checklist)
* **Cơ chế:** Bảng kiểm hành lý phân quyền thông minh cho cả nhóm trước giờ lên đường.
* **Tính năng:**
  * Chia rõ 2 mục: Đồ dùng cá nhân (tự chuẩn bị) và Đồ dùng chung cho cả đoàn (thuốc y tế, loa bluetooth, lều trại, máy ảnh...).
  * Phân công rõ người phụ trách từng món đồ chung; hiển thị thanh tiến độ chuẩn bị (Progress Bar) để trưởng đoàn theo dõi real-time.

### 7.3. Trợ Lý Lộ Trình Thông Minh (GenAI Trip Assistant)
* **Cơ chế:** Ứng dụng mô hình ngôn ngữ lớn (LLM) kết hợp dữ liệu vị trí địa phương.
* **Tính năng:**
  * Đề xuất điểm ăn uống, giải trí chuẩn theo "gu" ẩm thực và ngân sách bình quân đầu người của nhóm.
  * Tự động tối ưu hóa thứ tự các điểm dừng trong ngày để cung đường di chuyển ngắn nhất, tránh kẹt xe và không bị ngược đường (TSP - Traveling Salesperson Problem Solver).

---

## 8. Quản Trị Rủi Ro Kỹ Thuật & Phương Án Xử Lý

```
+-----------------------------------+------------------------------------+
| RỦI RO TIỀM ẨN                     | GIẢI PHÁP TRIỂN KHAI               |
+-----------------------------------+------------------------------------+
| 1. Rào cản cài đặt app:           | - Webview / Mobile Web Guest View  |
|    Chỉ cần 1 thành viên lười tải  | - Xem lịch trình & nợ qua mã QR    |
|    app là chu trình bị gãy.       | - Không bắt buộc đăng ký phức tạp  |
+-----------------------------------+------------------------------------+
| 2. Mất sóng 4G giữa đường:        | - Kiến trúc Offline-First          |
|    Mạng chập chờn gây lỗi đồng bộ | - Local Database (Room / SQLite)   |
|    và mất dữ liệu chi tiêu.       | - Background Sync khi có mạng lại  |
+-----------------------------------+------------------------------------+
```

### Rủi ro 1: Rào cản cài đặt và tạo tài khoản (Friction in Onboarding)
* **Mối đe dọa:** Trong một nhóm bạn, thường có tâm lý ỷ lại. Nếu ứng dụng bắt buộc cả 8 người đều phải tải app từ Store và trải qua quy trình đăng ký rườm rà, chỉ cần 1 người không cài đặt thì nhóm sẽ lập tức quay lại dùng Zalo và Splitwise.
* **Phương án giải quyết:**
  * **Chế độ Thành viên Khách (Guest View):** Thành viên lười tải app có thể mở đường dẫn rút gọn trên trình duyệt di động (PWA/Webview) để xem lịch trình trực tiếp và số tiền cần đóng mà không cần đăng ký tài khoản.
  * Đăng nhập 1 chạm thông qua Google/Apple Sign-In hoặc quét mã QR nhóm để gia nhập tức thì trong 3 giây.

### Rủi ro 2: Mất kết nối mạng tại các cung đường thực địa (Network Flakiness)
* **Mối đe dọa:** Khi đi phượt vùng cao, rừng núi, việc mất kết nối 4G là điều hiển nhiên. Nếu ứng dụng yêu cầu kết nối mạng liên tục để tạo bill hoặc đọc lịch trình, người dùng sẽ gặp lỗi tải trang (infinite loading) và mất niềm tin vào hệ thống.
* **Phương án giải quyết:**
  * **Chiến lược Offline-First:** Sử dụng cơ sở dữ liệu cục bộ (Room DB / SQLite / WatermelonDB) lưu trữ toàn bộ dữ liệu chuyến đi ngay trên máy.
  * Mọi thao tác đánh dấu chặng hoàn tất và nhập chi phí đều được ghi nhận ngay lập tức vào Local DB (Optimistic UI updates).
  * Tích hợp cơ chế xử lý hàng đợi đồng bộ ngầm (Background Sync Queue): Khi thiết bị bắt lại sóng mạng, các thay đổi cục bộ sẽ tự động đẩy lên máy chủ và giải quyết xung đột dựa trên mốc thời gian (Timestamp Conflict Resolution).

---

## 9. Kế Hoạch Kiểm Thử Với Người Dùng Thật (Usability Testing & Pilot Plan)

### 9.1. Mẫu thử nghiệm (Target Cohort)
* **Số lượng:** Tuyển chọn trực tiếp **2 đến 3 nhóm sinh viên** chuẩn bị đi dã ngoại tự túc ngắn ngày (lộ trình phổ biến: TP.HCM – Vũng Tàu, TP.HCM – Đà Lạt 2 ngày 1 đêm).
* **Quy mô:** Mỗi nhóm từ 4 đến 6 người có độ gắn kết cao và có người chịu trách nhiệm tài chính cụ thể.

### 9.2. Kịch bản quan sát & kiểm thử thực địa (Field Testing Protocol)
Nhóm phát triển sẽ theo dõi (trực tiếp hoặc log telemetry từ xa) qua 4 mốc quan trọng:
1. **Trước chuyến đi (T-1 ngày):** Nhóm lập lịch trình và thống nhất các điểm đến trên ứng dụng.
2. **Trong chuyến đi (In-Trip):** Quan sát thói quen mở màn hình Live Trip Mode khi dừng đèn đỏ hoặc ngã rẽ; đo lường tỷ lệ sử dụng nút mở Google Maps.
3. **Tại các điểm dừng ăn uống:** Đo lường thời gian từ lúc thanh toán hóa đơn đến khi dữ liệu chi phí được nhập vào app.
4. **Kết thúc chuyến đi (Post-Trip):** Quan sát nhóm thực hiện thao tác quyết toán bù trừ nợ và chuyển khoản qua mã QR.

### 9.3. Thước đo thành công định lượng (Quantifiable Success Metrics)
* **Tốc độ nhập liệu:** Trên **$80\%$** các khoản chi tiêu phát sinh được ghi nhận thành công vào ứng dụng trong vòng **dưới 15 phút** sau khi rời khỏi quán.
* **Tốc độ quyết toán nợ:** Giải quyết dứt điểm toàn bộ công nợ chuyến đi trong vòng **dưới 3 phút** sau khi trở về, không có khiếu nại về sai sót số liệu.
* **Tỷ lệ giữ chân tác vụ (Task Completion Rate):** Đạt trên **$90\%$** các chặng dừng trong lịch trình được đánh dấu hoàn thành thông qua giao diện Live Mode.

---

## 10. Cam Kết Đầu Ra Dự Án

* **Triết lý sản phẩm:** Nhóm cam kết **tập trung giải quyết xuất sắc đúng một bài toán thực tế** — sự liền mạch giữa Lịch trình, Ngữ cảnh thực địa và Quyết toán chi phí — thay vì dàn trải nguồn lực để xây dựng một sản phẩm cồng kềnh với nhiều tính năng rời rạc.
* **Đầu ra học phần:**
  * Ứng dụng di động hoàn chỉnh có thể cài đặt trực tiếp (.apk / .ipa / TestFlight).
  * Backend API đồng bộ dữ liệu thời gian thực có khả năng xử lý ngoại tuyến.
  * Bộ video thực địa ghi nhận quá trình người dùng thử nghiệm ứng dụng trong chuyến đi thực tế.
