import React, { useState, useEffect } from "react";
import { Paper, Typography, Toolbar } from "@mui/material";
import api from "../../API/api";
import FarmerTable from "../table/farmerTable";
import Modal from "../../ui-component/modal";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import { styled, emphasize } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import Loader from "../../components/pannel/loader";
import CancelIcon from "@mui/icons-material/Cancel";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

const districts = [
  "Baksa",
  "Barpeta",
  "Biswanath",
  "Bongaigaon",
  "Cachar",
  "Charaideo",
  "Chirang",
  "Darrang",
  "Dhemaji",
  "Dhubri",
  "Dibrugarh",
  "Goalpara",
  "Golaghat",
  "Hailakandi",
  "Hojai",
  "Jorhat",
  "Kamrup Metropolitan",
  "Kamrup",
  "Karbi Anglong",
  "Karimganj",
  "Kokrajhar",
  "Lakhimpur",
  "Majuli",
  "Morigaon",
  "Nagaon",
  "Nalbari",
  "Dima Hasao",
  "Sivasagar",
  "Sonitpur",
  "South Salmara-Mankachar",
  "Tinsukia",
  "Udalguri",
  "West Karbi Anglong",
];

const lac = [
  "Abhayapuri North (34)",
  "Abhayapuri South (35)",
  "Algapur (8)",
  "Amguri (103)",
  "Badarpur (5)",
  "Baghbar (45)",
  "Baithalangso (20)",
  "Barama (62)",
  "Barchalla (72)",
  "Barhampur (87)",
  "Barkhetry (60)",
  "Barkhola (14)",
  "Barpeta (43)",
  "Batadroba (84)",
  "Behali (77)",
  "Bhabanipur (41)",
  "Bihpuria (109)",
  "Bijni (33)",
  "Bilasipara East (27)",
  "Bilasipara West (26)",
  "Biswanath (76)",
  "Bokajan (17)",
  "Bokakhat (93)",
  "Boko (48)",
  "Bongaigaon (32)",
  "Chabua (121)",
  "Chapaguri (63)",
  "Chaygaon (49)",
  "Chenga (47)",
  "Dalgaon (68)",
  "Dergaon (97)",
  "Dhakuakhana (112)",
  "Dharmapur (61)",
  "Dhekiajuli (71)",
  "Dhemaji (113)",
  "Dhing (83)",
  "Dholai (11)",
  "Dhubri (23)",
  "Dibrugarh (116)",
  "Digboi (123)",
  "Diphu (19)",
  "Dispur (52)",
  "Doomdooma (125)",
  "Dudhnai (36)",
  "Duliajan (118)",
  "Gauhati East (53)",
  "Gauhati West (54)",
  "Gauripur (24)",
  "Goalpara East (37)",
  "Goalpara West (38)",
  "Gohpur (78)",
  "Golaghat (95)",
  "Golakganj (25)",
  "Gossaigaon (28)",
  "Haflong (16)",
  "Hailakandi (6)",
  "Hajo (55)",
  "Hojai (91)",
  "Howraghat (18)",
  "Jagiroad (79)",
  "Jaleswar (39)",
  "Jalukbari (51)",
  "Jamunamukh (90)",
  "Jania (44)",
  "Jonai (114)",
  "Jorhat (98)",
  "Kalaigaon (65)",
  "Kaliabor (89)",
  "Kamalpur (56)",
  "Karimganj North (3)",
  "Karimganj South (4)",
  "Katigorah (15)",
  "Katlicherra (7)",
  "Khumtai (96)",
  "Kokrajhar East (30)",
  "Kokrajhar West (29)",
  "Laharighat (81)",
  "Lahowal (117)",
  "Lakhimpur (111)",
  "Lakhipur (13)",
  "Lumding (92)",
  "Mahmara (105)",
  "Majbat (70)",
  "Majuli (99)",
  "Mangaldoi (67)",
  "Mankachar (21)",
  "Margherita (124)",
  "Mariani (101)",
  "Marigaon (80)",
  "Moran (115)",
  "Naharkatia (120)",
  "Nalbari (59)",
  "Naoboicha (110)",
  "Nazira (104)",
  "Nowgong (86)",
  "Palasbari (50)",
  "Panery (64)",
  "Patacharkuchi (42)",
  "Patharkandi (2)",
  "Raha (82)",
  "Rangapara (74)",
  "Rangiya (57)",
  "Ratabari (1)",
  "Rupohihat (85)",
  "Sadiya (126)",
  "Salmara South (22)",
  "Samaguri (88)",
  "Sarukhetri (46)",
  "Sarupathar (94)",
  "Sibsagar (108)",
  "Sidli (31)",
  "Silchar (9)",
  "Sipajhar (66)",
  "Sonai (10)",
  "Sonari (106)",
  "Sootea (75)",
  "Sorbhog (40)",
  "Tamulpur (58)",
  "Teok (102)",
  "Tezpur (73)",
  "Thowra (107)",
  "Tingkhong (119)",
  "Tinsukia (122)",
  "Titabar (100)",
  "Udalguri (69)",
  "Udharbond (12)",
];

const ps = [
  "ABDULAPUR - OP",
  "ABHAYAPURI - PS",
  "ADI-ELENGI-SATRA - OP",
  "AGIA - PS",
  "AGOMONI - PS",
  "ALGAPUR - PS",
  "ALL WOMEN - PS",
  "ALOPATICHAR - PS",
  "AMBIKAPUR - OP",
  "AMGURI - PS",
  "AMINGAON - OP",
  "AMSOI - OP",
  "AMTRENG - OP",
  "ANANDABAZAR - OP",
  "ANJOKPANI - PS",
  "ANNAPURNAGHAT - PS",
  "ARUNACHAL - OP",
  "ATANI - OP",
  "ATHIABARI - OP",
  "AYE RPO - OP",
  "AZARA - PS",
  "B.N.COLLEGE TOP - OP",
  "BADARPUR - PS",
  "BADATIGHAT - PS",
  "BAGANPARA - OP",
  "BAGHBOR - PS",
  "BAGHJAN - PS",
  "BAGHMARA - OP",
  "BAGINADI - PS",
  "BAGUAN - PS",
  "BAHATI - OP",
  "BAIHATACHARIALI - PS",
  "BAITAMARI - OP",
  "BAITHALANGSHU - PS",
  "BALAJAN - OP",
  "BALAPARA - OP",
  "BALICHANG - OP",
  "BALIKURI - OP",
  "BALLAMGURI - OP",
  "BAMUNBARI - OP",
  "BAMUNPUKHURI - OP",
  "BANDARCHALIHA - OP",
  "BANDERDEWA - OP",
  "BANDUKMARA - OP",
  "BANGALMARA - OP",
  "BARAMA - PS",
  "BARDUMSA - PS",
  "BARPATHAR - PS",
  "BARPETA - PS",
  "BARPETA ROAD - PS",
  "BASHBARI - PS",
  "BASISTHA - PS",
  "BASUGAON - PS",
  "BAZAR TOP - OP",
  "BAZARICHERRA - PS",
  "BEBEZIA - OP",
  "BEHALI - PS",
  "BEKAJAN - OP",
  "BEKI RPO - OP",
  "BELBARI - OP",
  "BELSIRI - OP",
  "BELSOR - PS",
  "BEREKURI - PS",
  "BHABANIPUR - OP",
  "BHADOI PANCHALI - OP",
  "BHAGADATTAPUR - OP",
  "BHAGAMUKH - PS",
  "BHAIRABKUNDA - OP",
  "BHANGAGARH - PS",
  "BHANGNAMARI - PS",
  "BHARALUMUKH - PS",
  "BHATKHOWADIA - PS",
  "BHELOWGURI - (PS)",
  "BHELOWGURI - PS",
  "BHERGAON - OP",
  "BHOGDOI - OP",
  "BHOTGAON - OP",
  "BHOWRAGURI - OP",
  "BHURAGAON - (PS)",
  "BHURAGAON - PS",
  "BIDYAPUR - OP",
  "BIHAGURI - OP",
  "BIHPURIA - PS",
  "BIHUBOR - PS",
  "BIJNI - PS",
  "BIJOY NAGAR - OP",
  "BILAIPUR - OP",
  "BILASHIPARA - PS",
  "BIRUBARI - OP",
  "BISWANATH CHARIALI - PS",
  "BISWANATHGHAT - PS",
  "BOGIJAN - PS",
  "BOGRIBARI - PS",
  "BOKAJAN - PS",
  "BOKAKHAT - PS",
  "BOKATA NEMUGURI - PS",
  "BOKO - PS",
  "BOKOLIA - PS",
  "BONDIHANA - OP",
  "BONGAIGAON - PS",
  "BONGAON - OP",
  "BORBAM - OP",
  "BORBARUA - PS",
  "BORBORI - OP",
  "BORBORI - PS",
  "BORCHOLA - OP",
  "BORDOLONI - OP",
  "BORDOWA - PS",
  "BORDUBI - PS",
  "BORGHAT - OP",
  "BORGHOLA - OP",
  "BORGONG - OP",
  "BORHAT - PS",
  "BORHOLA - PS",
  "BORJHAR - OP",
  "BORKHOLA - PS",
  "BORLONGFAR - PS",
  "BOROBAZAR - OP",
  "BORPATHAR - PS",
  "BORSALA - OP",
  "BORVITHA - OP",
  "BURABURI RPO - OP",
  "BURAH - OP",
  "CHABUA - PS",
  "CHAGALIA - OP",
  "CHANDARDINGA RPO - OP",
  "CHANDMARI - PS",
  "CHANDRAPUR - (PS)",
  "CHANGCHUP CHARIALI - PS",
  "CHANGSARI - PS",
  "CHAPAR - PS",
  "CHARAIPUNG - PS",
  "CHARBAZAR TOP - OP",
  "CHARDUAR - PS",
  "CHARKHOLIA CHAPORI - OP",
  "CHAULDHUWA - OP",
  "CHAYGAON - PS",
  "CHENGAJANGHAT - PS",
  "CHEREKAPAR - OP",
  "CHINAMORA - OP",
  "CHOTOGUMA - OP",
  "CHOWKIHOLA - PS",
  "CHUNARI - PS",
  "CHUNGAJAN - PS",
  "DADARA - OP",
  "DADGIRI - OP",
  "DAIPAM - OP",
  "DALGAON - PS",
  "DAMRA - OP",
  "DANGTAL - OP",
  "DARANGAMELA - OP",
  "DARGAKONA - OP",
  "DAULASAL - OP",
  "DEBASTHAN - OP",
  "DEBERAPAR - OP",
  "DEHANGI - PS",
  "DEHENDIJUA - OP",
  "DEITHOR - PS",
  "DEMOW - PS",
  "DERGAON - PS",
  "DHAKHI MAJULI - PS",
  "DHAKUAKHANA - PS",
  "DHALIGAON - PS",
  "DHALPUR - OP",
  "DHANSIRI - OP",
  "DHARAMTUL - (PS)",
  "DHARAMTUL - PS",
  "DHEKIAJULI - PS",
  "DHEKIAL - OP",
  "DHEMAJI - PS",
  "DHING - PS",
  "DHOLA - PS",
  "DHOLAI - PS",
  "DHOMDHOMA - OP",
  "DHUBRI - PS",
  "DHULA - PS",
  "DHUMORPATHAR - OP",
  "DHUPDHARA - PS",
  "DIBRUGARH - PS",
  "DICHANGMUKH - OP",
  "DIGBOI - PS",
  "DIKOM - OP",
  "DILLAI - PS",
  "DIMAKUCHI - PS",
  "DIPHU - PS",
  "DISPUR - PS",
  "DITTOCK CHERRA - OP",
  "DIYANGMUKH - PS",
  "DOBAK - OP",
  "DOBOKA - PS",
  "DOKMOKA - PS",
  "DOLAMARA - PS",
  "DOLBARI - OP",
  "DOLOHAT - OP",
  "DONKAMOKAN - OP",
  "DOOMDOOMA - PS",
  "DOOMNI - OP",
  "DOTOMA - PS",
  "DUDHNOI - PS",
  "DULIAJAN - PS",
  "DWARBOND - PS",
  "EKRABARI - OP",
  "FAKIRAGRAM - PS",
  "FAKIRGANJ - PS",
  "FANCY BAZAR - OP",
  "FATASIL AMBARI - PS",
  "FURKATING - OP",
  "GABHARUPATHAR - OP",
  "GANDHIBARI - OP",
  "GARMOUR - OP",
  "GARMUR - PS",
  "GARUBHASHA - OP",
  "GARUFELA - OP",
  "GAURISAGAR - PS",
  "GEETANAGAR - PS",
  "GELEKY - PS",
  "GELLAPUKHURI - OP",
  "GERUKAMUKH - PS",
  "GHILADHARI - PS",
  "GHILAMARA - PS",
  "GHOGRAPAR - PS",
  "GHORAMARA - OP",
  "GHUNGUR - OP",
  "GINJIA - PS",
  "GOALPARA - PS",
  "GOALPARA TOP - OP",
  "GOBARDHANA - PS",
  "GOGAMUKH - PS",
  "GOHPUR - PS",
  "GOLAGHAT - PS",
  "GOLAKGANJ - PS",
  "GORAIMARI - OP",
  "GORCHUK - PS",
  "GORESWAR - PS",
  "GOSSAIGAON - PS",
  "GOURIPUR - PS",
  "GRAHAMPUR - OP",
  "GUIJAN - OP",
  "HAFLONG - PS",
  "HAHIM - OP",
  "HAIBARGAON TOP - OP",
  "HAILAKANDI - PS",
  "HAJO - PS",
  "HALUATING - PS",
  "HAMREN - PS",
  "HARANGAJAO - PS",
  "HARISINGA - PS",
  "HARMOTI - OP",
  "HATIGAON - PS",
  "HATIKHALI - OP",
  "HAWAJAN - OP",
  "HAZIRHAT - PS",
  "HELEM - PS",
  "HIJOGURI TOP - OP",
  "HOJAI - PS",
  "HOWLY - PS",
  "HOWRAGHAT - PS",
  "I.S.B.T. - OP",
  "ITACHALI TOP - OP",
  "ITAKHOLA - OP",
  "ITAPARA - OP",
  "JAGIROAD - (PS)",
  "JAGIROAD - PS",
  "JAGUN - OP",
  "JAJORI - PS",
  "JAKHALABANDHA - PS",
  "JALUKANI - OP",
  "JALUKBARI - OP",
  "JALUKBARI - PS",
  "JAMBARI - OP",
  "JAMIRA - OP",
  "JAMUGURI - PS",
  "JAMUNAMUKH - PS",
  "JARAGURI - OP",
  "JENGRAIMUKH - PS",
  "JHAIGHRAN - OP",
  "JIRIGHAT - PS",
  "JOGIGHOPA - PS",
  "JOHYING - OP",
  "JOLESWAR - OP",
  "JONAI - PS",
  "JORABAT - OP",
  "JORHAT - PS",
  "JORSIMALU - OP",
  "JOYPUR - PS",
  "JOYSAGAR - OP",
  "JURIA - PS",
  "KACHARIGAON - OP",
  "KACHUA - PS",
  "KACHUDARAM - PS",
  "KACHUGAON - PS",
  "KACHUMARA - PS",
  "KAJALGAON - PS",
  "KAKATIBARI - PS",
  "KAKI - PS",
  "KAKOPATHAR - PS",
  "KALACHERRA - OP",
  "KALAIGAON - PS",
  "KALAIN - PS",
  "KALAPANI - OP",
  "KALGACHIA - PS",
  "KALIABOR - PS",
  "KALIBARI - OP",
  "KAMAKHYA - OP",
  "KAMALPUR - PS",
  "KAMARBANDHA - OP",
  "KAMARGAON - PS",
  "KAMARKUCHI - OP",
  "KAMPUR - PS",
  "KARICHERA - OP",
  "KARIMGANJ - PS",
  "KATAKHAL - OP",
  "KATIGORAH - PS",
  "KATLICHERA - PS",
  "KAYAKUCHI - OP",
  "KAZIGAON - PS",
  "KHAGRABARI - OP",
  "KHAIRABARI - PS",
  "KHANAPARA - OP",
  "KHARMUJA - OP",
  "KHARUBONDHA - OP",
  "KHARUPETIA - PS",
  "KHATKHATI - PS",
  "KHATOWAL - PS",
  "KHELMATI TOWN - OP",
  "KHERONI - PS",
  "KHETRI - PS",
  "KHOWANG - PS",
  "KHUMTAI - OP",
  "KOHORA - OP",
  "KOILA-MOILA - OP",
  "KOKRAJHAR - PS",
  "KOYA - PS",
  "KRISHNAI - PS",
  "KUKURKATA - OP",
  "KUKURMARA - OP",
  "KUMARIKATA - OP",
  "KUMBHIRGRAM SOP - OP",
  "KUMGURI - OP",
  "LAHARIGHAT - (PS)",
  "LAHARIGHAT - PS",
  "LAHDOIGARH - OP",
  "LAHOWAL - PS",
  "LAKHI NAGAR - OP",
  "LAKHIPUR - PS",
  "LAKUA - OP",
  "LALA - PS",
  "LALMATI - OP",
  "LALPANI - OP",
  "LALPOOL - OP",
  "LALUK - PS",
  "LANGTING - PS",
  "LANKA - PS",
  "LANKU - OP",
  "LAOKHOWA CHAPARI - PS",
  "LAOPANI - OP",
  "LATASIL - PS",
  "LEDO - OP",
  "LEKHAPANI - PS",
  "LENKASHI - OP",
  "LICHUBARI - OP",
  "LILABARI - OP",
  "LOWER LANGPI - OP",
  "LUMDING - PS",
  "MACHKHOWA - OP",
  "MADHAPUR - OP",
  "MAHABHAIRAB - OP",
  "MAHUR - PS",
  "MAIBONG - PS",
  "MAILOO - OP",
  "MAJERALGA RPO - OP",
  "MAJULI - PS",
  "MAKUM - PS",
  "MALIGAON - OP",
  "MALUGRAM TOP - OP",
  "MANCACHAR - PS",
  "MANDERDISA - OP",
  "MANDIA - OP",
  "MANDIRA - OP",
  "MANGALDOI - PS",
  "MANIKPUR - PS",
  "MANJA - PS",
  "MARGHERITA - PS",
  "MARIANI - PS",
  "MARNOI - PS",
  "MATHURAPUR - PS",
  "MATIA - PS",
  "MAYONG - (PS)",
  "MAYONG - PS",
  "MAZBAT - PS",
  "MAZDIA - OP",
  "MEDICAL COLLEGE HOSPITAL - OP",
  "MERAPANI - PS",
  "MERERCHAR - PS",
  "MHOANPUR - OP",
  "MIKIRBHETA - (PS)",
  "MIKIRBHETA - PS",
  "MILAN NAGAR - OP",
  "MISSAMARI - PS",
  "MOAINBARI - OP",
  "MOHANBARI - OP",
  "MOIRABARI - (PS)",
  "MOIRABARI - PS",
  "MOKOILUM - OP",
  "MORAN - PS",
  "MORANHAT - PS",
  "MORIGAON - (PS)",
  "MORIGAON - PS",
  "MORIKOLONG TOP - OP",
  "MOWMARI - OP",
  "MUKALMUA - PS",
  "MURAJHAR - PS",
  "MUSHALPUR - PS",
  "NA- SADIYA - OP",
  "NAGAON - PS",
  "NAGARBERA - PS",
  "NAGARGERA RPO - OP",
  "NAGRIJULI - OP",
  "NAHARKATIA - PS",
  "NALBARI - PS",
  "NAMPANIGAON - OP",
  "NAMRUP - PS",
  "NAMTI CHARIALI - PS",
  "NAMTOLA - PS",
  "NANIAJAN - OP",
  "NAPUKHURI - OP",
  "NARAYANPUR - PS",
  "NAYAHAT - OP",
  "NAYERALGA - OP",
  "NAZIRA - PS",
  "NEEMATI - OP",
  "NEEMATIGHAT - PS",
  "NELIE - OP",
  "NIKASHI - OP",
  "NILAMBAZAR - PS",
  "NITAI PUKHURI - OP",
  "NOONMATI - PS",
  "NORTH - SALMARA - OP",
  "NORTH GUWAHATI - OP",
  "NORTH GUWAHATI - PS",
  "NORTH LAKHIMPUR - PS",
  "NOWHOLIA - OP",
  "NUMALIGARH REFINERY - OP",
  "ORANG - PS",
  "OUGURI - OP",
  "PALASHBARI - PS",
  "PALASHBARI TOP - OP",
  "PALONG GHAT - OP",
  "PALTANBAZAR - PS",
  "PANBARI - OP",
  "PANBARI - PS",
  "PANBAZAR - PS",
  "PANCHARANTA - PS",
  "PANCHGRAM - PS",
  "PANDU - OP",
  "PANERI - PS",
  "PANIGAON - PS",
  "PANIKHAITI - OP",
  "PANIMUR - OP",
  "PANITOLA - OP",
  "PATACHARKUCHI - PS",
  "PATAKATA - PS",
  "PATGAON - OP",
  "PATHARIGHAT - OP",
  "PATHARKANDI - PS",
  "PATHSALA - OP",
  "PENGERI - PS",
  "PHILLOBARI - PS",
  "PRAGJYOTISHPUR - PS",
  "PULIBAR - PS",
  "PURANA LEIKUL - OP",
  "RAHA - PS",
  "RAJGARH - OP",
  "RAKHASMARI - OP",
  "RAMDIA - OP",
  "RAMKRISHNA NAGAR - PS",
  "RAMNATHPUR - PS",
  "RANGAPARA - PS",
  "RANGIA - PS",
  "RANGIA TOP - OP",
  "RANGIRKHARI TOP - OP",
  "RANGJULI - PS",
  "RANGSAI - OP",
  "RANI - OP",
  "RANIGANJ - OP",
  "RANTHOLI - OP",
  "RATABARI - PS",
  "ROHMORIA - PS",
  "RONGMONGWE - PS",
  "ROWMARI - OP",
  "ROWRIAH - OP",
  "ROWTA - PS",
  "RUNIKHATA - PS",
  "RUPAHIHAT - PS",
  "RUPSHI - OP",
  "SACHAL - PS",
  "SACHANI - OP",
  "SADIYA - PS",
  "SAIKHOWAGHAT - PS",
  "SALABILA - OP",
  "SALAKATI - OP",
  "SALANIBARI - OP",
  "SALBARI - PS",
  "SALKOCHA - OP",
  "SAMAGURI - PS",
  "SAMELANGSO - PS",
  "SAPATGRAM - PS",
  "SAPEKHATI - PS",
  "SAPKATA - OP",
  "SAPMARI - OP",
  "SARKARI BAGAN TOP - OP",
  "SARTHEBARI - PS",
  "SARUPATHAR - PS",
  "SARUPETA - OP",
  "SELENGHAT - OP",
  "SEPON - OP",
  "SERFANGURI - PS",
  "SHANTIPUR - OP",
  "SHRISPUR - OP",
  "SHYAMPUR - PS",
  "SIALMARI CHAR - PS",
  "SIDLI - PS",
  "SILAPATHAR - PS",
  "SILBORI - OP",
  "SILCHAR - PS",
  "SILONIBARI - OP",
  "SIMALUGURI - PS",
  "SIMENCHAPORI - PS",
  "SIMLA - PS",
  "SIMLITOLA - OP",
  "SIMOLUGURI - OP",
  "SIMULTAPU - OP",
  "SIMULUGURI - PS",
  "SINGORI - OP",
  "SINGRIMARI - OP",
  "SIPAJHAR - PS",
  "SISIBORGAON - OP",
  "SIVASAGAR - PS",
  "SOLMARA - OP",
  "SOMORIA - OP",
  "SONAI - PS",
  "SONAI CHAPORI - OP",
  "SONAPUR - PS",
  "SONARI - PS",
  "SONTOLI - OP",
  "SOOTEA - PS",
  "SORBHOG - PS",
  "SOUTH SALMARA - PS",
  "SUALKUCHI - PS",
  "SUFFRY - OP",
  "SUHAGPUR - OP",
  "SUKCHAR - PS",
  "SUMONIGAON - OP",
  "TALAP - OP",
  "TAMARHAT - PS",
  "TAMULPUR - PS",
  "TANGANA - PS",
  "TANGLA - PS",
  "TARABARI - PS",
  "TARAPUR TOP - OP",
  "TENGAKHAT - PS",
  "TENGAPUKHURI - OP",
  "TEOK - PS",
  "TEZPUR - PS",
  "TEZPUR MEDICAL COLLEGE - OP",
  "THELAMARA - PS",
  "THREE KILO - OP",
  "TIHU - PS",
  "TINALIPAM - OP",
  "TINGKHONG - PS",
  "TINGRAI CHARIALI - OP",
  "TINSUKIA - PS",
  "TIPAKAI - PS",
  "TIPKAI - OP",
  "TITABOR - PS",
  "TOPAMARI - OP",
  "TULSHIBARI - OP",
  "TULSHIBIL - OP",
  "UDALBAKARA - OP",
  "UDALGURI - PS",
  "UDARBOND - PS",
  "ULUANI - PS",
  "ULUKUNCHI - OP",
  "UMRANGSHU - PS",
  "URIAMGHAT - PS",
  "UTTAR BARBIL - OP",
  "ZIRIKINDING - PS",
];

const bankName = [
  "AIRTEL PAYMENT BANK",
  "ALLAHABAD BANK",
  "ANDHRA BANK",
  "ASSAM CO-OP APEX BANK LTD",
  "ASSAM GRAMIN VIKASH BANK",
  "AU SMALL FINANCE BANK LIMITED",
  "AXIS BANK",
  "BANDHAN BANK LIMITED",
  "BANK OF BARODA",
  "BANK OF INDIA",
  "BANK OF MAHARASHTRA",
  "CANARA BANK",
  "CENTRAL BANK OF INDIA",
  "ESAF SMALL FINANCE BANK LIMITED",
  "FEDERAL BANK",
  "FINO PAYMENT BANK",
  "HDFC BANK",
  "ICICI BANK LIMITED",
  "IDBI BANK",
  "IDFC First Bank Ltd",
  "INDIA POST BANK",
  "INDIAN BANK",
  "INDIAN OVERSEAS BANK",
  "INDIAN POST PAYMENTS BANK",
  "INDUSIND BANK",
  "JANA SMALL FINANCE BANK LTD",
  "KARNATAKA BANK LIMITED",
  "KOTAK MAHINDRA BANK LIMITED",
  "MEGHALAYA CO-OP APPEX BANK",
  "MEGHALAYA RURAL BANK",
  "NALBARI URBAN CO-OPERATIVE BANK LTD.",
  "NORTH EAST SMALL FINANCE BANK LIMITED",
  "PAYTM PAYMENTS BANK",
  "PUNJAB AND SIND BANK",
  "PUNJAB NATIONAL BANK",
  "RBL BANK LIMITED",
  "RESERVE BANK OF INDIA",
  "SOUTH INDIAN BANK",
  "STANDARD CHARTERED BANK",
  "STATE BANK OF INDIA",
  "SURYODAY SMALL FINANCE BANK LIMITED",
  "UCO BANK",
  "UJJIVAN SMALL FINANCE BANK LIMITED",
  "UNION BANK OF INDIA",
  "UNITED BANK",
  "UTKARSH SMALL FINANCE BANK",
  "YES BANK",
];

export default function AddFarmer() {
  const [data, setData] = useState([]);
  const [temp, setTemp] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  const [dsc, setDcs] = useState(
    JSON.parse(sessionStorage.getItem("user")).role === "DCS"
      ? JSON.parse(sessionStorage.getItem("user")).uid
      : ""
  );
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState({
    regno: "",
    dcs: "",
  });
  const [isSearch, setIsSearch] = useState(false);

  const [formData, setFormData] = useState({
    dcsID: JSON.parse(sessionStorage.getItem("user")).uid,
    district: JSON.parse(sessionStorage.getItem("user")).district,
  });

  // useEffect(() => {
  //   getAllFarmers();
  // }, []);

  const handleInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddFarmer = () => {
    console.log("=>", formData);
    setLoading(true);

    api
      .createFarmer(formData)
      .then((res) => {
        console.log("res : ", res);
        setApplicationId(res.data.applicationId);
        // Swal.fire("Farmer added", "", "success");
        // setModalOpen(false);
        setLoading(false);
        // getAllFarmers();
      })
      .catch((err) => {
        console.log("err :", err);
      });
  };

  const getAllFarmers = () => {
    setLoading(true);
    if (user) {
      api
        .getAllFarmers(dsc, user)
        .then((res) => {
          console.log("res :", res);
          setData(res.data.data);
          setTemp(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("err ", err);
        });
    }
  };

  // const searchFarmer = () => {
  //   console.log("search :", search);
  //   if (!search.dcs && !search.regno) {
  //     console.log("Both can't be null");
  //     return;
  //   }
  //   api
  //     .searchFarmer(search)
  //     .then((res) => {
  //       console.log("res", res);
  //       setData(res.data.data);
  //       setIsSearch(true);
  //     })
  //     .catch((err) => {
  //       console.log("err: ", err);
  //     });
  // };

  const cancelSearch = () => {
    setIsSearch(false);
    setData(temp);
    setSearch({
      regno: "",
      dcs: "",
    });
  };

  const [isUploaded, setIsuploaded] = useState({
    passbook: false,
    panCard: false,
    aadhaarCard: false,
    arcs_drcs: false,
  });

  const [passbook, setPassbook] = useState();
  const [panCard, setPanCard] = useState();
  const [aadhaarCard, setAadhaarCard] = useState();
  const [arcs_drcs, setArcsDrcs] = useState();
  const [applicationId, setApplicationId] = useState();
  const [showFileForm, setShowFileForm] = useState(false);

  useEffect(() => {
    if (applicationId) {
      setShowFileForm(true);
    }
  }, [applicationId]);

  const handleFileUpload = (type) => {
    console.log(type);

    if (type === "passbook") {
      console.log("here", type);
      upload(type, passbook, "passbook");
    }
    if (type === "panCard") {
      upload(type, panCard, "pancard");
    }
    if (type === "aadhaarCard") {
      upload(type, aadhaarCard, "aadharcard");
    }
    if (type === "arcs_drcs") {
      upload(type, arcs_drcs, "arcs_drcs");
    }
  };

  const upload = (type, file, fileName) => {
    if (!file) {
      toast.warn("No file chosen !");
      console.log("file not found");
      return;
    }
    setLoading(true);
    console.log("Type=", type, "File=", file);
    console.log("formData.mobileNumber ==>>", formData.mobileNumber);
    const Data = new FormData();
    Data.append("applicationId", applicationId);
    Data.append("mobileNumber", formData.mobileNumber);
    Data.append("fileType", type);
    Data.append("fileName", fileName + "." + file.name.split(".")[1]);
    Data.append("fileSize", file.size);
    Data.append("file", file);
    console.log("Data=", Data);
    api
      .uploadDocument(Data)
      .then((res) => {
        console.log("Response==>", res);
        toast.success("Uploaded!");
        switch (type) {
          case "passbook":
            setIsuploaded({ ...isUploaded, passbook: true });
            break;
          case "panCard":
            setIsuploaded({ ...isUploaded, panCard: true });
            break;
          case "aadhaarCard":
            setIsuploaded({ ...isUploaded, aadhaarCard: true });
            break;
          case "arcs_drcs":
            setIsuploaded({ ...isUploaded, arcs_drcs: true });
            break;
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log("error==>", err);
      });
  };

  const handleSubmit = () => {
    if (
      isUploaded.passbook === false ||
      isUploaded.aadhaarCard === false ||
      isUploaded.panCard === false
    ) {
      console.log("All file required");
      //   Swal.fire('All files required !');
      toast.warn("All file required !");
      return;
    }

    const data = {
      applicationId: applicationId,
      status: 1,
    };
    api
      .updateFormStatus(data)
      .then((res) => {
        console.log("final response :", res);
        setApplicationId("");
        setModalOpen(false);
        Swal.fire("Farmer Added successfully !");
        getAllFarmers();
      })
      .catch((err) => {
        console.log("err : ", err);
        Swal.fire("Something went wrong !");
      });
  };

  const handleSkip = () => {
    setModalOpen(false);
    getAllFarmers();
    setApplicationId("");
  };

  const fileForm = () => {
    return (
      <>
        <Paper>
          <div className="p-3">
            <div>
              <strong>Upload Documents for : {formData.name}</strong>
            </div>
            <div>
              <strong>Application ID : {applicationId}</strong>
            </div>
          </div>
          <div className="row p-4">
            <div className="col-md-6">
              <label htmlFor="">Attach photo of passbook (first page)</label>
              <input
                type="file"
                className="form-control"
                onChange={(e) => setPassbook(e.target.files[0])}
              />
            </div>
            <div className="col-md-6 d-flex align-items-center gap-4">
              <Button
                variant="contained"
                onClick={() => handleFileUpload("passbook")}
              >
                Upload
              </Button>{" "}
              {isUploaded.passbook && <DoneAllIcon color="success" />}
            </div>

            <div className="col-md-6">
              <label htmlFor="">Attach photo of PAN card</label>
              <input
                type="file"
                className="form-control"
                onChange={(e) => setPanCard(e.target.files[0])}
              />
            </div>
            <div className="col-md-6 d-flex align-items-center gap-4">
              <Button
                variant="contained"
                onClick={() => handleFileUpload("panCard")}
              >
                Upload
              </Button>{" "}
              {isUploaded.panCard && <DoneAllIcon color="success" />}
            </div>

            <div className="col-md-6">
              <label htmlFor="">Attach photo of AADHAAR card</label>
              <input
                type="file"
                className="form-control"
                onChange={(e) => setAadhaarCard(e.target.files[0])}
              />
            </div>
            <div className="col-md-6 d-flex align-items-center gap-4">
              <Button
                variant="contained"
                onClick={() => handleFileUpload("aadhaarCard")}
              >
                Upload
              </Button>{" "}
              {isUploaded.aadhaarCard && <DoneAllIcon color="success" />}
            </div>

            {/* <div className="col-md-6">
                            <label htmlFor="">Attach photo of ARCS/DRCS</label>
                            <input
                                type="file"
                                className="form-control"
                                onChange={(e) => setArcsDrcs(e.target.files[0])}
                            />
                        </div> */}
            {/* <div className="col-md-6 d-flex align-items-center gap-4">
                            <Button
                                variant="contained"
                                onClick={() => handleFileUpload("arcs_drcs")}
                            >
                                Upload
                            </Button>{" "}
                            {isUploaded.arcs_drcs && <DoneAllIcon color="success" />}
                        </div> */}

            <div className="col-md-12">
              <div className="d-flex justify-content-center gap-3">
                <Button
                  variant="outlined"
                  color="success"
                  onClick={() => handleSkip()}
                >
                  Skip
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleSubmit}
                >
                  Confirm and Submit
                </Button>
              </div>
            </div>
          </div>
        </Paper>
      </>
    );
  };

  const addForm = () => {
    return (
      <>
        <div>
          <Paper elevation={4}>
            <div className="py-2 my-2 text-center">
              <h3>Add Farmer</h3>
            </div>
          </Paper>
        </div>
        <Paper elevation={4}>
          <div className="row form-row p-4">
            <div className="col-md-6 form-group">
              <label htmlFor="">Name of the applicant</label>
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={handleInput}
                id=""
                placeholder="Name of the applicant"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="">Father/Spouse's Name</label>
              <input
                type="text"
                className="form-control"
                name="fathersName"
                onChange={handleInput}
                id=""
                placeholder="Father/Spouse's Name"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="">Date of Birth</label>
              <input
                type="date"
                className="form-control"
                name="dob"
                onChange={handleInput}
                id=""
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="">Gender of the applicant</label>
              <select
                className="form-control"
                name="gender"
                onChange={handleInput}
                id=""
              >
                <option value="">Please select</option>
                <option value="male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="">12 digit AADHAAR number</label>
              <input
                type="text"
                className="form-control"
                name="aadhaarNo"
                onChange={handleInput}
                id=""
                placeholder="12XXXXXXXXXXXXX"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="">AADHAAR linked mobile number</label>
              <input
                type="text"
                className="form-control"
                name="aadharMobile"
                onChange={handleInput}
                id=""
                placeholder="+91 XXXXXXXXXX"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="">PAN number</label>
              <input
                type="text"
                className="form-control"
                name="pan_number"
                onChange={handleInput}
                id=""
                placeholder="PANXXXXXXX"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="">Voter ID number</label>
              <input
                type="text"
                className="form-control"
                name="voterID"
                onChange={handleInput}
                id=""
                placeholder="Voter ID"
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="">Area of residence</label>
              <select
                type="text"
                className="form-control"
                name="area"
                onChange={handleInput}
                id=""
              >
                <option value="">Please select</option>
                <option value="Urban">Urban</option>
                <option value="Rural">Rural</option>
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="">District</label>

              {formData.district ? (
                <select
                  className="form-control"
                  name="district"
                  onChange={handleInput}
                  id=""
                  defaultValue={formData.district}
                >
                  <option value={formData.district}>{formData.district}</option>
                </select>
              ) : (
                <>
                  <select
                    className="form-control"
                    name="district"
                    onChange={handleInput}
                    id=""
                    defaultValue={formData.district}
                  >
                    <option value="">Please select</option>
                    {districts &&
                      districts.map((d) => <option value={d}>{d}</option>)}
                  </select>
                </>
              )}
            </div>

            <div className="col-md-6">
              <label htmlFor="">LAC</label>
              <select
                type="text"
                className="form-control"
                name="LAC"
                onChange={handleInput}
                id=""
              >
                <option value="">Please select</option>
                {lac && lac.map((d) => <option value={d}>{d}</option>)}
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="">Village</label>
              <input
                type="text"
                className="form-control"
                name="village"
                onChange={handleInput}
                id=""
                placeholder="Village"
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="">Gaon Panchayat</label>
              <input
                type="text"
                className="form-control"
                name="gaon_panchayat"
                onChange={handleInput}
                id=""
                placeholder="Gaon Panchayat"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="">Block</label>
              <input
                type="text"
                className="form-control"
                name="block"
                onChange={handleInput}
                id=""
                placeholder="Block"
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="">Pincode</label>
              <input
                type="text"
                className="form-control"
                name="pincode"
                onChange={handleInput}
                id=""
                placeholder="78XXXX"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="">Police Station</label>
              <select
                type="text"
                className="form-control"
                name="police_station"
                onChange={handleInput}
                id=""
              >
                <option value="">Please select</option>
                {ps && ps.map((d) => <option value={d}>{d}</option>)}
              </select>
            </div>

            <div className="col-md-6">
              <label htmlFor="">Name of the bank</label>
              <select
                type="text"
                className="form-control"
                name="bank_name"
                onChange={handleInput}
                id=""
              >
                <option value="">Please select</option>
                {bankName &&
                  bankName.map((d) => <option value={d}>{d}</option>)}
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="">
                Name of the Account holder (as mentioned in the passbook)
              </label>
              <input
                type="text"
                className="form-control"
                name="bank_account_holder_name"
                onChange={handleInput}
                id=""
                placeholder="Account holder name"
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="">Bank Account Number</label>
              <input
                type="text"
                className="form-control"
                name="bank_account_no"
                onChange={handleInput}
                id=""
                placeholder="Bank Account Number"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="">IFSC code</label>
              <input
                type="text"
                className="form-control"
                name="ifsc_code"
                onChange={handleInput}
                id=""
                placeholder="IFSC code"
              />
            </div>

            <div className="col-md-12">
              <div className="text-center">
                <Button
                  variant="contained"
                  disabled={loading}
                  // className="btn btn-primary btn-sm"
                  onClick={handleAddFarmer}
                >
                  Save Farmer
                </Button>
              </div>
            </div>
          </div>
        </Paper>
      </>
    );
  };


  const [searchStatus, setSearchStatus]= useState();
  const handleSearch=(status)=>{
    setSearchStatus(status)
  }

  return (
    <>
      <ToastContainer />
      <Loader open={loading} />
      <Paper className="p-1 mb-3">
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            "@media (max-width: 600px)": {
              flexDirection: "column",
              alignItems: "flex-start",
            },
          }}
        >
          <Typography
            sx={{ display: "flex", gap: 2 }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Farmer
          </Typography>
          <div role="presentation">
            <Breadcrumbs aria-label="breadcrumb">
              <StyledBreadcrumb
                component="a"
                href="/#/admin/dashboard"
                label="Home"
                icon={<HomeIcon fontSize="small" />}
              />
              {/* <StyledBreadcrumb component="a" href="#" label="Catalog" /> */}
              <StyledBreadcrumb label="Farmer" />
            </Breadcrumbs>
          </div>
        </Toolbar>
      </Paper>

      <div>
        <Modal
          open={modalOpen}
          handleClose={() => setModalOpen(false)}
          modaldata={applicationId ? fileForm() : addForm()}
          maxWidth="lg"
        />

        <div>
          <Paper className="p-2">
            <div className="py-3">
              <div className="d-flex justify-content-between">
                <div className="d-flex gap-2">
                  <input
                    type="text"
                    placeholder="Search by DCS"
                    value={search.dcs}
                    onChange={(e) =>
                      setSearch({ ...search, dcs: e.target.value })
                    }
                    className="form-control col-6"
                    name=""
                    id=""
                  />
                  <input
                    type="text"
                    placeholder="Search by Reg. no"
                    value={search.regno}
                    onChange={(e) =>
                      setSearch({ ...search, regno: e.target.value })
                    }
                    className="form-control col-6"
                    name=""
                    id=""
                  />
                  <div>
                    {searchStatus === "search"? (
                      <Button variant="contained" onClick={()=>handleSearch('cancel')}>
                      {/* <Button variant="contained" onClick={cancelSearch}> */}
                        <CancelIcon />
                      </Button>
                    ) : (
                      <Button variant="contained" onClick={()=>handleSearch('search')}>
                      {/* <Button variant="contained" onClick={searchFarmer}> */}
                        <SearchIcon />
                      </Button>
                    )}
                  </div>
                </div>

                {JSON.parse(sessionStorage.getItem("user")).role === "DCS" && (
                  <div className="text-end">
                    <Button
                      variant="contained"
                      onClick={() => setModalOpen(true)}
                    >
                      +Add Farmer
                    </Button>
                  </div>
                )}
              </div>
              <FarmerTable
                data={data}
                setApplicationId={setApplicationId}
                setModalOpen={setModalOpen}
                search={search}
                setSearch={setSearch}
                // searchFarmer={searchFarmer}
                searchStatus={searchStatus}
              />
            </div>
          </Paper>
        </div>
      </div>
    </>
  );
}
