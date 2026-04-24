import fs from 'fs';
import path from 'path';

const OUT = 'd:/development/Web/websites/DongShengClinicNew/blog';

const posts = [
  {
    slug: 'toris',
    title: '妥瑞氏症',
    date: '2020年01月11日',
    author: '曾冬勝 醫師',
    tag: '兒童青少年',
    img: 'blog_toris.png',
    tags: ['兒童青少年', '妥瑞氏症'],
    related: [
      {href:'child-issue.html', title:'讀錯字、寫錯字，我的小孩有過動症嗎？', date:'2020年02月17日'},
      {href:'sleeping-method.html', title:'如何不使用安眠藥克服失眠', date:'2020年06月17日'},
    ],
    content: `
<p>你有聽過50多歲的男性才被診斷出妥瑞氏症的事嗎？夠離譜了吧！</p>
<p>他輾轉看過非常多科的醫師、眼科耳鼻喉科檢查都正常、甚至也看過身心科的醫師、並沒有把它醫好！所以妥瑞氏症並不是容易診斷或者是容易治療的疾病。</p>
<p>前高雄妥瑞氏症關懷協會謝來順理事長曾經表示：家長與病人的巨大痛苦是：不被了解、異常的眼光、怪胎這樣的傷害性最大！其實妥瑞氏症的治療是不難的！只要確定診斷，治療效果是非常好。</p>
<p>眨眼睛、擤鼻涕應該是最常見的、那合併的大塊肌肉的抽動的時候就比較容易被發現；如果有大叫甚至發出怪聲音這樣的聲音痙攣的、不被接納的比例就更高了！所以從剛開始發生症狀的時候得到好的治療非常的重要。也比較能夠避免影響人際關係、學業功課、注意力以及人格發展。</p>
`
  },
  {
    slug: 'intestine',
    title: '腸躁症',
    date: '2020年01月21日',
    author: '曾冬勝 醫師',
    tag: '自律神經',
    img: 'blog_intestine.jpg',
    tags: ['自律神經', '腸躁症'],
    related: [
      {href:'stomache.html', title:'胃痛但胃鏡正常怎麼辦？', date:'2020年05月12日'},
      {href:'heart-thremble.html', title:'心悸也可以找身心科', date:'2019年12月17日'},
    ],
    content: `
<p>又叫做大腸激躁症。</p>
<p>我們跟大腸科最有關的症狀就是大腸激躁症！顧名思義這個疾病就是大腸過於蠕動快速所以會有拉肚子，一緊張就想要上廁所，發生在膀胱叫做膀胱過動症、發生在大腸就叫做大腸激躁症。</p>
<p>這個疾病的機轉就是當我們緊張的時候我們的交感神經過於亢奮，導致體內的乙醯膽鹼跟多巴胺不平衡。於是就造成腎上腺素過高，而導致腸蠕動變快。</p>
<p>所以當發生面對緊張或壓力這樣的情形的時候，我們身體就不聽使喚的想要上廁所，這樣的現象極為常見！不分年齡、不分族群！所以輕度的並不影響學業工作、但嚴重的往往造成困窘的情形！也就是說甚至大小便已經來不及到廁所裏解，這樣苦惱的個案不少！</p>
<p>這樣的情況，在冬勝診所我們會詳細的鑒別診斷，例如從生活習慣、飲食，是不是有比較刺激性的食物或者使用香煙酒精等！再來就是這樣的情況是不是常常發生在壓力過大的時候？面對壓力的一個處置技巧不容易處理。或者在臨床診療檢查不管糞便或者是大腸鏡都沒有異常，所以我們治療將會導入鑒別診斷之後以放鬆技巧訓練、生理回饋、甚至調整生活作息、飲食習慣、再加上抗焦慮等收斂的藥物就會改善！</p>
<p>朋友們如果你有這個症狀，請到冬勝診所來，我們會協助你。</p>
`
  },
  {
    slug: 'material-treatment',
    title: '針對物質使用疾患的動機促進心理治療',
    date: '2020年02月14日',
    author: '曾冬勝 醫師',
    tag: '成癮',
    img: 'blog_news.jpg',
    tags: ['成癮', '心理治療'],
    related: [
      {href:'churchie-blackdog.html', title:'邱吉爾與黑狗', date:'2020年04月04日'},
      {href:'heart-thremble.html', title:'心悸也可以找身心科', date:'2019年12月17日'},
    ],
    content: `
<p>在我們周遭使用酒精啊等等不管是合法或者是非法物質的個案非常之多！合法的物質除了酒精、香煙、處方藥劑之外、其他最近新興的一些成癮性的診斷例如網路成癮啊等等。非法物質的成癮就如同大家一般人講的毒品、常聽到的像海洛因、安非他命、搖頭丸、大麻等。</p>
<p>物質使用疾患常常共病著情感性疾患以及性格異常、適應不良等狀況。在社會治安與公共安全方面，合併物質濫用，佔意外事件、交通事故以及自殺已遂個案常見的相關因素。所以治療物質相關疾患就是我們冬勝診所重大的目標。</p>
<p>在治療的策略我今天要特別介紹是促進動機心理治療！這個治療目前被全世界公認是物質使用疾患的有效心理治療方法。</p>
<p>簡單地說我們有很多家屬及病友正面臨著成癮性物質的痛苦而且求助無門！輕症患者尋求宗教、家庭的支持、親友的協助可以改善。然而中重度患者，反覆的一而再、再而三地進出醫療院所、勒戒所、甚至監獄！不只患者身心受創；連家屬也遭受巨大的財務經濟壓力以及羞辱感的情緒負擔。</p>
<p>所以我今天介紹的動機促進心理治療，重點就在協助正在遭受這樣的痛苦的個案與家屬。這個治療最重要的步驟在第一個步驟就是促進病患有想要改變的動機；其次是鞏固這樣的動機。這個過程需要我們專業人員的協助，包含醫師、心理師等等。</p>
<p>雖然目前健保沒有給付物質使用疾病的相關治療，這種心理治療我也衷心地推薦給大家！因為經過這樣的治療所獲得的回饋、收穫，以及所降低的負擔、成本，不是陽春麵式的健保給付這樣子的計算方法！</p>
`
  },
  {
    slug: 'child-issue',
    title: '讀錯字、寫錯字，我的小孩有過動症嗎？',
    date: '2020年02月17日',
    author: '曾冬勝 醫師',
    tag: '兒童青少年',
    img: 'blog_misspell.jpg',
    tags: ['兒童青少年', 'ADHD'],
    related: [
      {href:'toris.html', title:'妥瑞氏症', date:'2020年01月11日'},
      {href:'oldman-pig.html', title:'淺談老人與山豬', date:'2020年03月01日'},
    ],
    content: `
<p>我常常聽到家長這樣的詢問。小朋友因為這樣的狀況到診間的情緒都是困窘、被懲罰的感覺。我覺得我們可以改變這樣的現象、就是要從認識它開始。</p>
<p>過動症起名以為這類的病理是活動力過高！而目前越來越多的研究發現注意力不足是一個重要的面向、甚至注意力的重要不亞於活動量。而且女性因為雙親教養態度以及社會文化的因素，注意力不足常常不容易被發現。</p>
<p>我覺得對於活動力過高以及注意力不足目前的重點應該是避免標籤化。原因是注意力不足或是活動力過高的治療效果很好、預後也很好、而且不一定要靠藥物。</p>
<p>身為主要照顧者，小孩子的教育不完全要依賴學校老師！家長的角色，言教、身教也極為重要。從一個人長大的過程來看，父母親的影響往往更深、更不被發現他的影響力，成人後期的表現逐漸顯現出來。</p>
<p>其次是避免被貼標籤化這樣的議題，我覺得在兒童心理裡面也是家長必須重視的！往往這樣的學童容易被貼上不受歡迎的標籤或者是異類而被團體排斥。這個情緒壓力的衝擊不亞於注意不足過動影響學習、導致學習障礙的後遺症。更值得老師及家長注意呀！</p>
<p>我的建議是有類似這樣的困擾，透過情緒管理與注意力練習的方案，再加上輔助角色藥物治療，這樣的現象都會得到改善。我們團隊有博士級的兒童心理治療師可以協助，風評佳。</p>
`
  },
  {
    slug: 'throat-tight',
    title: '喉嚨緊緊的該看哪一科？',
    date: '2020年02月17日',
    author: '曾冬勝 醫師',
    tag: '自律神經',
    img: 'blog_throat.png',
    tags: ['自律神經', '喉嚨'],
    related: [
      {href:'heart-thremble.html', title:'心悸也可以找身心科', date:'2019年12月17日'},
      {href:'intestine.html', title:'腸躁症', date:'2020年01月21日'},
    ],
    content: `
<p>我的門診常常見到不少個案的主訴是喉嚨緊緊的！</p>
<p>而在耳鼻喉科做完喉鏡的檢查、驗血、X光都照完了、找不出毛病！後來呢間接聽到人家的推薦到我的門診。這樣的症狀在以前的古人是認為梅核氣，那現在從我們的角度來看這個現象是交感神經副交感神經失調的症狀。</p>
<p>我們的呼吸常常不自覺地也不自主地決定它的頻率！</p>
<p>簡單地說，有時候我們呼吸變快、變淺，我們自己也不知道！不知不覺中我們血液中的氧氣濃度跟二氧化碳的比例都改變了！間接的也改變了我們血液的酸鹼值。我們自己不知道長期以往下來也影響了我們的肺功能。總覺得呼吸不順暢，這樣大大的影響了我們的睡眠，也改變了我們的生活步調。以為得了不治之症！</p>
<p>其實這樣的症狀，在我們冬勝診所有自律神經的調節訓練的技術可以很快的改善這樣的現象。不管是喉嚨緊緊的或者是胸部緊緊的，或者覺得呼吸困難等等，這些在我們的門診都是很常見的！我們也有很多個案都恢復了！</p>
`
  },
  {
    slug: 'oldman-pig',
    title: '淺談老人與山豬',
    date: '2020年03月01日',
    author: '曾冬勝 醫師',
    tag: '老年照護',
    img: 'blog_threepig.png',
    tags: ['老年照護', '失智症', '憂鬱症'],
    related: [
      {href:'churchie-blackdog.html', title:'邱吉爾與黑狗', date:'2020年04月04日'},
      {href:'child-issue.html', title:'讀錯字、寫錯字，我的小孩有過動症嗎？', date:'2020年02月17日'},
    ],
    content: `
<p>天啊！曾醫師：老人跟山豬有什麼關係呀？</p>
<p>老人常見的身心科疾病有三類：一種是憂鬱症、第二類是失智症、第三類是譫妄。這三類的疾病的英文字母開頭是D：Depression、Dementia、Delirium，也就是3D！號稱三豬！這山豬如何困擾著病患跟家屬呢？</p>
<h2>憂鬱症</h2>
<p>首先我們來看憂鬱症：老年憂鬱在自殺終身盛行率是雙高峰的其中一個，原因非常複雜。從生物學的因素來看老人身體機能逐漸衰敗、體力變差、活動力下降、系統運轉與代謝變慢、完全沒有身體疾病的人少之又少，而且長期慢性病治療的效果一直困擾著衛生體系，使患者產生沒有用了、老了、不行了等等負面的認知。</p>
<p>這些現象不僅帶來生活上的不便利，甚至因為配偶、長輩的過世，更促發了迫近死亡的念頭！如果再加上支持系統的薄弱或挫折事件就會產生災難性的思考。在走向高齡化的台灣，也是我們必須重視的重大議題。</p>
<h2>失智症</h2>
<p>其次是失智症：隨著政府推動長照法2.0，目前在失智症在照顧上已經有明顯的進步。早期失智的症狀不見得是從記憶力的減退開始。常見的早期症狀：例如錯誤的判斷、錯誤的投資、特殊的男女關係、異常的財務處理。這些現象如果照顧者沒有基本的觀念，是難以覺察這是失智症的症狀。其他例如空間的處理、速度變慢、開車的技術變鈍了，這個也是常見的老化狀態，都應該要來找我們專業的人做完整的評估。</p>
<h2>譫妄</h2>
<p>第三是比較少見的譫妄：它的特徵是時間、地點、人物等定向感的錯誤，甚至有幻覺的症狀；往往跟著時間白天或黑夜症狀會惡化；常常因為內外科的疾病導致。只要找到病因，很快就改善了。</p>
<p>冬勝診所是專業的社區醫療團隊、也是社區健康的耕耘者！我希望社區的老人會因為我們的加入照顧而更安全。</p>
`
  },
  {
    slug: 'headache',
    title: '頭痛',
    date: '2020年03月04日',
    author: '曾冬勝 醫師',
    tag: '頭痛',
    img: 'blog_headache.jpg',
    tags: ['頭痛', '身心科'],
    related: [
      {href:'heart-thremble.html', title:'心悸也可以找身心科', date:'2019年12月17日'},
      {href:'throat-tight.html', title:'喉嚨緊緊的該看哪一科？', date:'2020年02月17日'},
    ],
    content: `
<p>頭痛是個惱人的問題！我們常常聽到人家講頭痛，但是除了少數嚴重的疾病之外，大部分頭痛是找不到器質性病因，而頭痛跟我們身心科的關係非常密切，原因是頭痛裡面比例占最大的就是張力性頭痛（tension headache）；其次就是偏頭痛；再來就是叢集性頭痛。以上為原發性的頭痛，此類頭痛並不會有生命危險。</p>
<h2>有生命危險的頭痛</h2>
<p>有生命危險的頭痛一般都是具有器質性病因的！例如腦炎、腦膜炎這一類的引起的頭痛，常常合併會有發燒，病因是病毒或細菌等病媒感染所造成。</p>
<p>再來呢就是腦瘤：腦瘤的頭痛常合併有其他神經學的病變、例如視覺模糊、複視、聽力或肢體的障礙。</p>
<p>第三就是中風：腦血管中風引起的頭痛常合併有肢體偏癱，類似腦瘤的神經學症狀；而中風引起的原因是血管梗塞或出血，所以多半具有高血壓的病史。</p>
<h2>原發性頭痛與身心科</h2>
<p>張力性頭痛是最常見的頭痛類型，與肌肉緊張和壓力密切相關。在身心科，我們可以透過放鬆訓練、自律神經調節以及適當的藥物治療，有效改善這類頭痛。</p>
<p>如果您有反覆頭痛的困擾，建議先排除器質性原因後，也可以來冬勝診所讓我們協助您找到根本原因。</p>
`
  },
  {
    slug: 'churchie-blackdog',
    title: '邱吉爾與黑狗',
    date: '2020年04月04日',
    author: '曾冬勝 醫師',
    tag: '憂鬱症',
    img: 'blog_oldmandog.jpg',
    tags: ['憂鬱症', '身心科'],
    related: [
      {href:'stomache.html', title:'胃痛但胃鏡正常怎麼辦？', date:'2020年05月12日'},
      {href:'sleeping-method.html', title:'如何不使用安眠藥克服失眠', date:'2020年06月17日'},
    ],
    content: `
<p>十多年前高高屏精神科醫師的雙月會當時輪到802醫院舉辦，我就以主題：海報寫的是「邱吉爾與黑狗」！</p>
<p>很多人不明所以，到底邱吉爾跟黑狗怎麼一回事？去年2019世界衛生組織一樣以邱吉爾心中的黑狗當作主題，來推動全世界精神衛生的重大議題：憂鬱症的太慢發現、under診斷與治療！</p>
<p>邱吉爾（Winston Churchill）是二次大戰時帶領英國抵抗納粹的偉大領袖，但他一生都在與憂鬱症搏鬥。他把憂鬱症比喻為一隻跟著他的「黑狗」——陰魂不散、令人窒息。</p>
<p>憂鬱症的under診斷問題至今仍然嚴峻。許多患者因為不了解自己的症狀、或因社會污名化而不敢就醫，錯過了最佳的治療時機。</p>
<p>憂鬱症的症狀包括：持續情緒低落、對原本喜愛的事物失去興趣、睡眠或食慾改變、疲倦感、注意力難以集中，甚至有自傷或輕生的念頭。</p>
<p>如果您或您的親友有上述症狀，請不要猶豫，及早來冬勝診所讓我們協助評估與治療。憂鬱症是可以治療的——越早發現，效果越好。</p>
`
  },
  {
    slug: 'gay-issue',
    title: '同性戀還會難以啟齒嗎？',
    date: '2020年05月04日',
    author: '曾冬勝 醫師',
    tag: '心身健康',
    img: 'blog_lgbt.png',
    tags: ['心身健康', '心理支持'],
    related: [
      {href:'churchie-blackdog.html', title:'邱吉爾與黑狗', date:'2020年04月04日'},
      {href:'phobia.html', title:'創傷後症候群', date:'2020年06月04日'},
    ],
    content: `
<p>雖然在2019年5月17號中華民國是亞洲第一個全國性通過同性婚姻的國家；</p>
<p>而回顧我當精神科醫師的30年的經歷，我的門診因為同性戀這樣的議題來求診的還真的不少！</p>
<p>今天我想說的是：2015年監察委員到辦公室找我討論有關同性婚姻這個議題！他問我的看法？因為明年要大選了，各黨派的候選人，包含總統、立法委員等的發言，混雜了家庭、社會、經濟、宗教、法界團體的意見。整個社會因為這個議題而沸沸揚揚！</p>
<p>我單純從精神醫學的角度來看同性婚姻的議題！美國是從60年代吵到八零年代，才把同性戀這個診斷剔除於DSM III-R（1987）的診斷系統。也就是說把同性戀跟自我矛盾的性取向徹底分開！自我矛盾性取向就是現在所談的定義為性別認同障礙。而同性戀不屬於精神疾病。</p>
<p>我想說的重點並不是法律硬梆梆的文字、甚至同性婚姻等等的議題。我要說的是活生生、赤裸裸的個案、在我的診間、我們周遭、仍然不容易講出來、甚至說出來他是同性戀者的困窘還是有！即使法律已經保障了同性婚姻，然而我們的社會、我們的家長是不是在情緒心理上接受了？</p>
<p>冬勝診所提供安全、不批判的空間，讓每一位前來就診的朋友都能安心地分享自己的困境，無論是性別認同或其他心理議題，我們都在這裡陪伴您。</p>
`
  },
  {
    slug: 'stomache',
    title: '胃痛但胃鏡正常怎麼辦？',
    date: '2020年05月12日',
    author: '曾冬勝 醫師',
    tag: '心身醫學',
    img: 'blog_stomachache.jpg',
    tags: ['心身醫學', '腸胃'],
    related: [
      {href:'intestine.html', title:'腸躁症', date:'2020年01月21日'},
      {href:'churchie-blackdog.html', title:'邱吉爾與黑狗', date:'2020年04月04日'},
    ],
    content: `
<p>常常聽到很多親戚朋友因為胃痛、胃不舒服，胃漲漲的、消化不良、沒有食慾！去看了腸胃科，做完胃鏡的檢查，沒有明顯的發現。這樣的個案也不少。如果有這樣症狀的朋友們：請不要忘了、這樣的現象在我們身心科也很常見。</p>
<p>根據黃帝內經靈樞經脈：這個症狀常常合併一直打哈欠、呻吟、顏深面黑、不喜歡跟人講話、聽到聲音會容易驚慌！有時候甚至出很多汗、身體熱熱的、胃口好、很會吃！而且很容易餓。小便黃。吃了胃藥好一段時間又復發了！</p>
<p>類似這樣複雜難處理的情形：我的建議是，不妨來我們這裡參考一下！你將會得到妥善的治療。常與情緒低落、憂鬱有關！</p>
<p>臨床上我們稱呼這個叫做Masked depression——隱藏式的憂鬱症，非以憂鬱為主訴，而常常有多種身體化的症狀。如果來找我們專業的身心科醫師得到確診，那他的治療是非常容易而且好的快。</p>
`
  },
  {
    slug: 'zannen',
    title: '殘念',
    date: '2020年06月02日',
    author: '曾冬勝 醫師',
    tag: '心身醫學',
    img: 'blog_zannen.jpg',
    tags: ['心身醫學'],
    related: [
      {href:'stomache.html', title:'胃痛但胃鏡正常怎麼辦？', date:'2020年05月12日'},
      {href:'phobia.html', title:'創傷後症候群', date:'2020年06月04日'},
    ],
    content: `
<p>常常聽到很多親戚朋友因為胃痛、胃不舒服，胃漲漲的、消化不良、沒有食慾！去看了腸胃科，做完胃鏡的檢查，沒有明顯的發現。這樣的個案也不少。如果有這樣症狀的朋友們：請不要忘了、這樣的現象在我們身心科也很常見。</p>
<p>根據黃帝內經靈樞經脈：這個症狀常常合併一直打哈欠、呻吟、顏深面黑、不喜歡跟人講話、聽到聲音會容易驚慌！有時候甚至出很多汗、身體熱熱的、胃口好、很會吃！而且很容易餓。小便黃。吃了胃藥好一段時間又復發了！</p>
<p>類似這樣複雜難處理的情形：我的建議是，不妨來我們這裡參考一下！你將會得到妥善的治療。常與情緒低落、憂鬱有關！</p>
<p>臨床上我們稱呼這個叫做Masked depression——隱藏式的憂鬱症，非以憂鬱為主訴，而常常有多種身體化的症狀，如果來找我們專業的身心科醫師得到確診，那他的治療是非常容易而且好的快。</p>
<p>「殘念」這個詞，在日語中意指遺憾、放不下的心情。許多心身症狀其實是情緒的身體語言——讓我們一起來找出並釋放那些積壓已久的遺憾。</p>
`
  },
  {
    slug: 'phobia',
    title: '創傷後症候群',
    date: '2020年06月04日',
    author: '曾冬勝 醫師',
    tag: '心身醫學',
    img: 'blog_injure.jpg',
    tags: ['心身醫學', '創傷'],
    related: [
      {href:'churchie-blackdog.html', title:'邱吉爾與黑狗', date:'2020年04月04日'},
      {href:'sleeping-method.html', title:'如何不使用安眠藥克服失眠', date:'2020年06月17日'},
    ],
    content: `
<p>要報告這樣個案的症狀、源起，讓我重新去體會她的痛苦？這實在是一件不容易的事情！</p>
<p>一進診間，有個蠻高的年輕人陪著這個媽媽，大約40來歲的婦女，她的主訴是睡不著覺！經過詢問才知道說在三個月前大兒子出車禍死掉了？陪診的是二兒子。眼睛直視但沒有目標。</p>
<p>聽指令慢但走的快：體重一量，掉了12公斤，剩71公斤：可見她平常是多麼強壯的體格。</p>
<blockquote>「他們都叫我不要想！我怎麼有可能不要想呢？」</blockquote>
<p>這種痛苦需要藥物治療、心理治療、家人陪伴。也不見得說經過一段時間、就一定會好起來！只能一步一步摸著石頭過河，因為它跟憂鬱症不太一樣。</p>
<p>然而創傷後症候群他不只是氨基酸高低、它還有失衡問題！還有混亂的問題！甚至導致認知功能障礙！這些是需要專業人員的協助才會好起來。第三次已可獨自前來就診、不暈了！眼睛有神了。</p>
<p>婆娑世界，真不容易。</p>
`
  },
  {
    slug: 'sleeping-method',
    title: '如何不使用安眠藥克服失眠',
    date: '2020年06月17日',
    author: '曾冬勝 醫師',
    tag: '失眠',
    img: 'blog_sleepill.jpg',
    tags: ['失眠', '生活習慣'],
    related: [
      {href:'heart-thremble.html', title:'心悸也可以找身心科', date:'2019年12月17日'},
      {href:'throat-tight.html', title:'喉嚨緊緊的該看哪一科？', date:'2020年02月17日'},
    ],
    content: `
<p>我們都知道預防勝於治療。但是如何預防失眠，大部分人的觀念並不完全了解。</p>
<p>今天我們就來談談哪些狀況下會引起失眠！生活習慣中我們常會碰到使用香煙跟咖啡茶等刺激性食物或遊戲活動！這些是很確定的會引起失眠。簡單地說，讓我們的心跳加速的刺激物都是會引起失眠！都是不利於睡眠！</p>
<p>所以有失眠的朋友們這些都要謹慎。你是晚上睡覺的人，你接觸尤其是我推薦你萬一要喝到茶、咖啡、應該要在上午，簡單地說就是起床以後才適合接觸這些食材跟刺激性的活動。</p>
<h2>幫助睡眠的生活調整</h2>
<p>以下幾點可以幫助改善睡眠品質：</p>
<p>第一，固定的睡眠時間。每天盡量在固定時間上床和起床，幫助建立身體的生理時鐘。</p>
<p>第二，睡前避免刺激。睡前1-2小時避免使用手機、電腦等藍光設備，避免咖啡因和酒精。</p>
<p>第三，放鬆訓練。透過深呼吸、漸進式肌肉放鬆等技巧，幫助身體從緊繃狀態過渡到放鬆狀態。</p>
<p>第四，創造良好的睡眠環境。保持臥室涼爽、黑暗、安靜，只在睡覺和親密時刻使用床鋪。</p>
<p>如果這些方法還是無法改善您的失眠，建議來冬勝診所讓我們進行更完整的評估，找出失眠的根本原因。</p>
`
  },
];

function makePost(p) {
  const relatedHtml = p.related.map(r => `
        <a href="${r.href}" style="text-decoration:none;color:inherit;">
          <p style="font-size:.82rem;color:#1A1710;font-family:'Noto Serif TC',serif;font-weight:700;line-height:1.4;margin-bottom:.25rem;">${r.title}</p>
          <p style="font-size:.72rem;color:#C4BFB5;">${r.date}</p>
        </a>`).join('');

  const tagsHtml = p.tags.map(t => `<span style="padding:.35rem .8rem;border:1px solid rgba(26,23,16,.12);font-size:.78rem;color:#7A7568;">${t}</span>`).join('');

  return `<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${p.title} — 冬勝診所</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;700;900&family=Noto+Sans+TC:wght@300;400;500&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<script src="https://cdn.tailwindcss.com"><\/script>
<style>
  *,*::before,*::after{box-sizing:border-box}html{scroll-behavior:smooth}body{background:#FAF6EE;color:#1A1710;font-family:'Noto Sans TC','Inter',system-ui,sans-serif;-webkit-font-smoothing:antialiased}
  .label-caps{font-family:'Inter',sans-serif;font-weight:500;letter-spacing:.25em;text-transform:uppercase;font-size:.7rem}
  .nav-link{font-family:'Inter',sans-serif;font-size:.8rem;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:#1A1710;text-decoration:none;position:relative;transition:color .2s}
  .nav-link::after{content:'';position:absolute;bottom:-2px;left:0;width:0;height:1.5px;background:#D64000;transition:width .25s cubic-bezier(.4,0,.2,1)}
  .nav-link:hover{color:#D64000}.nav-link:hover::after{width:100%}
  .btn-primary{display:inline-flex;align-items:center;gap:.5rem;padding:.875rem 2rem;background:#1A1710;color:#FAF6EE;font-family:'Inter',sans-serif;font-size:.8rem;font-weight:500;letter-spacing:.15em;text-transform:uppercase;text-decoration:none;transition:transform .2s cubic-bezier(.34,1.56,.64,1),box-shadow .2s,background .2s;box-shadow:0 4px 16px rgba(26,23,16,.18)}
  .btn-primary:hover{background:#D64000;transform:translateY(-2px);box-shadow:0 8px 24px rgba(214,64,0,.28)}
  .article-body{font-size:1rem;line-height:1.9;color:#1A1710}
  .article-body p{margin-bottom:1.4rem}
  .article-body h2{font-family:'Noto Serif TC',serif;font-weight:700;font-size:1.2rem;color:#1A1710;margin:2rem 0 .75rem;letter-spacing:-.01em}
  .article-body blockquote{border-left:3px solid #D64000;padding-left:1.25rem;margin:1.5rem 0;color:#7A7568;font-style:italic}
  #mobile-menu{display:none}#mobile-menu.open{display:flex}
<\/style>
<\/head>
<body>
<nav id="navbar" style="position:fixed;top:0;left:0;right:0;z-index:50;background:rgba(250,246,238,.93);backdrop-filter:blur(12px);border-bottom:1px solid transparent;transition:all .3s;">
  <div style="max-width:80rem;margin:0 auto;padding:0 2.5rem;">
    <div style="display:flex;align-items:center;justify-content:space-between;height:4rem;">
      <a href="../" style="display:flex;align-items:center;gap:.75rem;text-decoration:none;">
        <div style="width:36px;height:36px;background:#D64000;display:flex;align-items:center;justify-content:center;"><span style="color:#FAF6EE;font-family:'Noto Serif TC',serif;font-weight:900;font-size:1rem;">冬<\/span><\/div>
        <div><div style="font-family:'Noto Serif TC',serif;font-weight:700;font-size:.95rem;color:#1A1710;line-height:1.2;">冬勝診所<\/div><div class="label-caps" style="color:#7A7568;font-size:.58rem;">Dong Sheng Clinic<\/div><\/div>
      <\/a>
      <div style="display:none;gap:2rem;align-items:center;" id="desktop-nav">
        <a href="../#services" class="nav-link">診療項目<\/a>
        <a href="../#about" class="nav-link">關於我們<\/a>
        <a href="../#doctor" class="nav-link">醫師介紹<\/a>
        <a href="../blog.html" class="nav-link" style="color:#D64000;">部落格<\/a>
        <a href="../#contact" class="nav-link">聯絡我們<\/a>
        <a href="tel:07-727-8392" class="btn-primary" style="padding:.6rem 1.25rem;font-size:.72rem;">07-727-8392<\/a>
      <\/div>
      <button id="menu-btn" style="padding:.5rem;background:none;border:none;cursor:pointer;color:#1A1710;"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"\/><line x1="3" y1="12" x2="21" y2="12"\/><line x1="3" y1="18" x2="21" y2="18"\/><\/svg><\/button>
    <\/div>
  <\/div>
  <div id="mobile-menu" style="flex-direction:column;background:rgba(250,246,238,.98);border-top:1px solid rgba(26,23,16,.08);padding:1rem 1.5rem 1.5rem;">
    <a href="../#services" class="nav-link" style="padding:.75rem 0;display:block;border-bottom:1px solid rgba(26,23,16,.06);">診療項目<\/a>
    <a href="../blog.html" class="nav-link" style="padding:.75rem 0;display:block;border-bottom:1px solid rgba(26,23,16,.06);color:#D64000;">部落格<\/a>
    <a href="../#contact" class="nav-link" style="padding:.75rem 0;display:block;">聯絡我們<\/a>
  <\/div>
<\/nav>
<style>@media(min-width:768px){#desktop-nav{display:flex!important;}#menu-btn{display:none;}}<\/style>

<div style="padding-top:4rem;height:420px;position:relative;overflow:hidden;">
  <img src="../../DongShengClinic/static/img/${p.img}" alt="${p.title}" style="width:100%;height:100%;object-fit:cover;filter:brightness(.7);">
  <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(26,23,16,.7) 0%,rgba(26,23,16,.2) 60%,transparent 100%);"><\/div>
  <div style="position:absolute;bottom:2.5rem;left:0;right:0;max-width:80rem;margin:0 auto;padding:0 2.5rem;">
    <nav style="display:flex;align-items:center;gap:.5rem;margin-bottom:1rem;">
      <a href="../" style="color:rgba(250,246,238,.5);font-family:'Inter',sans-serif;font-size:.72rem;text-decoration:none;" onmouseover="this.style.color='#D64000'" onmouseout="this.style.color='rgba(250,246,238,.5)'">首頁<\/a>
      <span style="color:rgba(250,246,238,.3);font-size:.7rem;">›<\/span>
      <a href="../blog.html" style="color:rgba(250,246,238,.5);font-family:'Inter',sans-serif;font-size:.72rem;text-decoration:none;" onmouseover="this.style.color='#D64000'" onmouseout="this.style.color='rgba(250,246,238,.5)'">部落格<\/a>
      <span style="color:rgba(250,246,238,.3);font-size:.7rem;">›<\/span>
      <span style="color:rgba(250,246,238,.6);font-family:'Inter',sans-serif;font-size:.72rem;">${p.tag}<\/span>
    <\/nav>
    <h1 style="font-family:'Noto Serif TC',serif;font-weight:900;font-size:clamp(1.75rem,4vw,3rem);color:#FAF6EE;line-height:1.15;letter-spacing:-.02em;">${p.title}<\/h1>
    <p style="font-family:'Inter',sans-serif;font-size:.78rem;color:rgba(250,246,238,.55);margin-top:.75rem;">${p.date} · ${p.author}<\/p>
  <\/div>
<\/div>

<div style="max-width:80rem;margin:0 auto;padding:4rem 2.5rem;display:grid;gap:4rem;justify-content:center;" class="article-layout">
<style>.article-layout{grid-template-columns:min(680px,100%);}@media(min-width:1024px){.article-layout{grid-template-columns:min(680px,100%) 280px;}}<\/style>
  <article class="article-body">
    ${p.content}
    <div style="margin-top:3rem;border:1px solid rgba(26,23,16,.1);padding:2rem;background:#F5F0E6;">
      <p class="label-caps" style="color:#D64000;margin-bottom:1rem;">冬勝診所<\/p>
      <p style="font-size:.85rem;line-height:1.8;margin-bottom:.5rem;">📞 預約電話：<a href="tel:07-727-8392" style="color:#D64000;text-decoration:none;font-weight:600;">07-727-8392<\/a><\/p>
      <p style="font-size:.85rem;line-height:1.8;margin-bottom:1.25rem;">📍 地址：802 台灣高雄市苓雅區中正一路（大順路口）<\/p>
      <a href="../#contact" class="btn-primary" style="font-size:.75rem;padding:.7rem 1.5rem;">預約掛號<\/a>
    <\/div>
    <div style="margin-top:2rem;padding-top:2rem;border-top:1px solid rgba(26,23,16,.08);">
      <a href="../blog.html" style="display:inline-flex;align-items:center;gap:.5rem;color:#7A7568;font-family:'Inter',sans-serif;font-size:.8rem;text-decoration:none;" onmouseover="this.style.color='#D64000'" onmouseout="this.style.color='#7A7568'">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"\/><\/svg>返回部落格
      <\/a>
    <\/div>
  <\/article>
  <aside style="display:none;" class="sidebar">
    <div style="position:sticky;top:5.5rem;">
      <p class="label-caps" style="color:#D64000;margin-bottom:1rem;">相關標籤<\/p>
      <div style="display:flex;flex-wrap:wrap;gap:.5rem;margin-bottom:2rem;">${tagsHtml}<\/div>
      <p class="label-caps" style="color:#D64000;margin-bottom:1rem;">其他文章<\/p>
      <div style="display:flex;flex-direction:column;gap:1rem;">${relatedHtml}<\/div>
    <\/div>
  <\/aside>
<style>@media(min-width:1024px){.sidebar{display:block!important;}}<\/style>
<\/div>

<footer style="background:#111009;padding:2rem 0;border-top:1px solid rgba(250,246,238,.06);">
  <div style="max-width:80rem;margin:0 auto;padding:0 2.5rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.75rem;">
    <p style="font-size:.72rem;color:rgba(250,246,238,.25);">© 2020–2026 冬勝診所 Dong Sheng Clinic<\/p>
    <a href="../blog.html" style="font-size:.72rem;color:rgba(250,246,238,.35);text-decoration:none;display:flex;align-items:center;gap:.4rem;" onmouseover="this.style.color='#D64000'" onmouseout="this.style.color='rgba(250,246,238,.35)'">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"\/><\/svg>返回部落格
    <\/a>
  <\/div>
<\/footer>
<script>
  const navbar=document.getElementById('navbar');
  window.addEventListener('scroll',()=>{navbar.style.borderBottomColor=window.scrollY>60?'rgba(26,23,16,.1)':'transparent';navbar.style.boxShadow=window.scrollY>60?'0 4px 24px rgba(26,23,16,.08)':'none';});
  document.getElementById('menu-btn').addEventListener('click',()=>document.getElementById('mobile-menu').classList.toggle('open'));
<\/script>
<\/body>
<\/html>`;
}

for (const post of posts) {
  const html = makePost(post);
  const file = path.join(OUT, `${post.slug}.html`);
  fs.writeFileSync(file, html, 'utf8');
  console.log(`✓ ${post.slug}.html`);
}
console.log('All done.');
