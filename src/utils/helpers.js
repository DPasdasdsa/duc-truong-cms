import {NUMBER_EN_US_FORMAT} from "@/constants/common";

export default {
  install(app) {
    app.config.globalProperties.$formatNumber = (num, type = null) => {
      if (!num) return 0;
      if (type === NUMBER_EN_US_FORMAT) {
        return new Intl.NumberFormat('en-US', {
          style: 'decimal',
          maximumFractionDigits: 20
        }).format(num);
      }
      return parseFloat(num);
    };

    function formatNumber(value) {
      return value >= 10 ? value : `0${value}`;
    }

    app.config.globalProperties.$formatDateTime = (dateTime) => {
      if (!dateTime) return;
      dateTime = new Date(dateTime);
      const year = formatNumber(dateTime.getFullYear());
      const month = formatNumber(dateTime.getMonth() + 1);
      const date = formatNumber(dateTime.getDate());
      const hours = formatNumber(dateTime.getHours());
      const minutes = formatNumber(dateTime.getMinutes());
      const seconds = formatNumber(dateTime.getSeconds());
      return `${hours}:${minutes}:${seconds} ${date}-${month}-${year}`;
    };

    app.config.globalProperties.$formatDate = (dateTime) => {
      if (!dateTime) return;
      dateTime = new Date(dateTime);
      const year = formatNumber(dateTime.getFullYear());
      const month = formatNumber(dateTime.getMonth() + 1);
      const date = formatNumber(dateTime.getDate());
      return `${date}-${month}-${year}`;
    };

    app.config.globalProperties.$showError = (err) => {
      if (err.meta.code === 500) return;
      for (const [key, value] of Object.entries(err.meta.errors)) {
        const el = document.getElementById(`${key}`);
        if (el) el.innerText = `${value}`;
      }
    };

    app.config.globalProperties.$removeError = () => {
      let error = document.getElementsByClassName('err');
      for (const value of error) {
        value.innerText = '';
      }
    };

    app.config.globalProperties.$validateFileExcel = (file) => {
      return app.config.globalProperties.$validateFile(file, {
        allowedExtensions: '\\.xls|\\.xlsx$',
        maxSizeInBytes: 5 * 1024 * 1024,
        extensions: ['xls', 'xlsx']
      });
    };

    app.config.globalProperties.$validateFileImage = (file, maxSize = 5) => {
      return app.config.globalProperties.$validateFile(file, {
        allowedExtensions: '\\.jpeg|\\.jpg|\\.png|\\.gif|\\.svg$',
        maxSizeInBytes: maxSize * 1024 * 1024,
        extensions: ['jpeg', 'jpg', 'png', 'gif', 'svg']
      });
    };

    app.config.globalProperties.$validateFilePdf = (file, maxSize = 5) => {
      return app.config.globalProperties.$validateFile(file, {
        allowedExtensions: '\\.pdf$',
        maxSizeInBytes: maxSize * 1024 * 1024,
        extensions: ['pdf']
      });
    };

    app.config.globalProperties.$validateFileCv = (file) => {
      return app.config.globalProperties.$validateFile(file, {
        allowedExtensions: '\\.doc|\\.docx|\\.pdf$',
        maxSizeInBytes: 5 * 1024 * 1024,
        extensions: ['doc', 'docx', 'pdf']
      });
    };

    app.config.globalProperties.$validateFileAudio = (file, limit = true) => {
      const validation = {
        allowedExtensions: '\\.mp3$',
        extensions: ['mp3']
      };
      if (limit) validation.maxSizeInBytes = 70 * 1024 * 1024;
      return app.config.globalProperties.$validateFile(file, validation);
    };

    // Base validate file.
    app.config.globalProperties.$validateFile = (file, options) => {
      const {allowedExtensions, maxSizeInBytes, extensions} = options;
      const allowedExtensionsRegex = new RegExp(allowedExtensions, 'i');
      const isValidExtension = allowedExtensionsRegex.test(file.name);
      if (!isValidExtension) {
        return `Vui lòng chỉ chấp nhận các tệp có đuôi ${extensions.join(', ')}.`;
      }
      const maxSizeInKilobytes = maxSizeInBytes / (1024 * 1024);
      const fileSizeInBytes = file.size;

      if (fileSizeInBytes > maxSizeInBytes) {
        return `Vui lòng chọn một tệp có kích thước nhỏ hơn ${maxSizeInKilobytes}MB.`;
      }
      return null;
    };
  }
};

