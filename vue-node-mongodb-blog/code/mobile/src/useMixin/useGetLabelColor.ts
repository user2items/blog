import { useStore } from "vuex";
import { computed } from "vue";

/**
 * 封装获取标签背景色逻辑
 * @description 文章Item、文章详情Detail
 */
const useGetLabelColor = () => {
  const store = useStore();
  const labelList = store.getters["label/labelList"];
  console.log("labelList:", labelList)
  const getLabelColor = computed(() => {
    return (labelName: string) => {
      if (labelList && labelList.length) { // mongo取数据
        let labelIndex = labelList.findIndex(
          (item: { label: string }) => item.label === labelName
        );
        if (labelIndex != -1) {// 判断自定义标签位置，获取标签颜色
          return labelList[labelIndex].bgColor;
        };
        console.log("labelIndex: ", labelIndex)
        
        // return labelList[labelIndex].bgColor;
      }
      return "rgba(70, 70, 70, 0.9)";
    };
  });

  return {
    getLabelColor,
  };
};

export default useGetLabelColor;
